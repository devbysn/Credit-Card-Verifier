package main

import (
	"fmt"
	"log"
	"verify_cc/controllers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	fmt.Println("inside main")

	router := gin.Default()
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"*"} // Set this to the appropriate origin URL of your frontend
	router.Use(cors.New(config))

	router.POST("verify", controllers.VerifyCreditCard)

	if err := router.Run(":8000"); err != nil {
		log.Fatal(err)
	}
}
