package main

import (
	"crypto/tls"
	"encoding/pem"
	"fmt"
	"log"
	"net/http"
	"time"
)

func main() {
	tran := &(*http.DefaultTransport.(*http.Transport)) // make shallow copy
	tran.TLSClientConfig = &tls.Config{InsecureSkipVerify: true}
	client := &http.Client{
		Timeout:   time.Second * 30,
		Transport: tran,
	}
	req, err := http.NewRequest("GET", "https://www.trsice.cz", nil)
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
			fmt.Printf("Issuer Name: %s\n", cert.Issuer)
			fmt.Printf("Subject: %s\n", cert.Subject)
			fmt.Printf("Expiry: %s \n", cert.NotAfter)
			fmt.Printf("Common Name: %s \n", cert.Issuer.CommonName)
			fmt.Printf("Signature: %X \n", cert.Signature)
			fmt.Printf("Signature Algorithm: %s \n", cert.SignatureAlgorithm)
			fmt.Printf("PEM certificate: \n%s\n", certPEM)
			fmt.Printf("=========================================\n")
		}
	}
}
