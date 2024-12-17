package infrastructure

import (
	"api/controllers"

	"github.com/gin-gonic/gin"
)

func SetupRouter(userController *controllers.UserController) *gin.Engine {
	router := gin.Default()

	router.POST("/signup", func(c *gin.Context) {
		userController.SignUpHandler(c.Writer, c.Request)
	})

	router.POST("/confirm", func(c *gin.Context) {
		userController.ConfirmSignUpHandler(c.Writer, c.Request)
	})

	router.POST("/resend-confirmation-code", func(c *gin.Context) {
		userController.ResendConfirmationCodeHandler(c.Writer, c.Request)
	})
	return router
}
