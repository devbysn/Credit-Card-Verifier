package controllers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type CreditCardVerificationReq struct {
	CardNumber string `json:"card_number"`
}

type CreditCardVerificationRes struct {
	Valid bool `json:"valid"`
}

func isValidCheckDigit(cardNumber string) bool {
	sum := 0
	parity := len(cardNumber) % 2

	for i, digitChar := range cardNumber {
		digit := int(digitChar - '0')

		if i%2 != parity {
			sum += digit
		} else if digit > 4 {
			sum += 2*digit - 9
		} else {
			sum += 2 * digit
		}

		fmt.Println("Sum : ", sum)
	}

	checkDigit := int(cardNumber[len(cardNumber)-1] - '0')
	return checkDigit == (10 - (sum % 10)) || (sum%10==0)
}

func VerifyCreditCard(c *gin.Context) {
	var request CreditCardVerificationReq
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	fmt.Println(request.CardNumber)
	valid := isValidCheckDigit(request.CardNumber)

	fmt.Println("Valid : ", valid)

	response := CreditCardVerificationRes{
		Valid: valid,
	}

	c.JSON(http.StatusOK, response)
}
