package main

import (
	"crypto/tls"
	"encoding/pem"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"time"
)

func getChain(w http.ResponseWriter, url string) {
	tran := &(*http.DefaultTransport.(*http.Transport)) // make shallow copy
	tran.TLSClientConfig = &tls.Config{InsecureSkipVerify: true}
	client := &http.Client{
		Timeout:   time.Second * 30,
		Transport: tran,
	}
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		log.Println(err)
		return
	}
	resp, err1 := client.Do(req)
	if err1 != nil {
		log.Println(err1)
		return
	}
	if resp.TLS != nil {
		certs := resp.TLS.PeerCertificates
		for _, cert := range certs {
			certPEM := pem.EncodeToMemory(&pem.Block{Type: "CERTIFICATE", Bytes: cert.Raw})
			fmt.Fprintf(w, "Issuer Name: %s\n", cert.Issuer)
			fmt.Fprintf(w, "Subject: %s\n", cert.Subject)
			fmt.Fprintf(w, "Expiry: %s \n", cert.NotAfter)
			fmt.Fprintf(w, "Common Name: %s \n", cert.Issuer.CommonName)
			fmt.Fprintf(w, "Signature: %X \n", cert.Signature)
			fmt.Fprintf(w, "Signature Algorithm: %s \n", cert.SignatureAlgorithm)
			fmt.Fprintf(w, "PEM certificate: \n%s\n", certPEM)
			fmt.Fprintf(w, "=========================================\n")
		}
	}
}

func apiHandler(w http.ResponseWriter, r *http.Request, trimPath string) {
	route := trimPath[5:8]
	switch route {
	case "url":
		apiEndpointHandler(w, r)
	default:
		handleErr(w, errors.New("API routing error."))
	}
}

func apiEndpointHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "text/plain; charset=utf-8")
	switch r.Method {
	case "GET":
		query := r.URL.Query()
		urlString := query.Get("url")
		getChain(w, urlString)
	}
}

func handleErr(w http.ResponseWriter, err error) {
	log.Println(err)
	http.Error(w, "Server error.", http.StatusInternalServerError)
}

func main() {
	// First command line argument is context path, e.g. "certinchains/"
	http.HandleFunc("/"+os.Args[1], func(w http.ResponseWriter, r *http.Request) {
		route := "index.html"
		trimPath := strings.ReplaceAll(r.URL.Path, os.Args[1], "")
		if len(trimPath) > 2 {
			route = trimPath[1:4]
		}
		switch route {
		case "api":
			apiHandler(w, r, trimPath)
		default:
			path := "public/" + trimPath[1:]
			log.Println(path)
			http.ServeFile(w, r, path)
		}
	})
	// Second command line argument is port.
	log.Fatal(http.ListenAndServe(":"+os.Args[2], nil))
}
