package main

import (
	"fmt"
	"log"
	"verify_cc/controllers"

	"github.com/gin-gonic/gin"
)

func main() {
	fmt.Println("inside main")

	router := gin.Default()

	router.GET("verify", controllers.VerifyCreditCard)

	if err := router.Run(":8000"); err != nil {
		log.Fatal(err)
	}
}
