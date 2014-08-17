package main

import (
	"fmt"
	"net/http"
	"os"
)

func main() {
	err := http.ListenAndServe(":8080", http.FileServer(http.Dir("./public")))
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}
