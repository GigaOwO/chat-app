package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func SetAuthCookies() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Next()

		if c.Writer.Status() == http.StatusOK {
			var response struct {
				Data struct {
					SignIn struct {
						Success bool
						Tokens  struct {
							AccessToken  string
							IdToken      string
							RefreshToken string
						}
					}
				}
			}

			if err := c.ShouldBindJSON(&response); err != nil {
				if response.Data.SignIn.Success {
					c.SetCookie(
						"access_token",
						response.Data.SignIn.Tokens.AccessToken,
						900, // 15分
						"/",
						"",
						false, // Secure
						true,  // HttpOnly
					)

					c.SetCookie(
						"id_token",
						response.Data.SignIn.Tokens.IdToken,
						900, // 15分
						"/",
						"",
						false, // Secure
						true,  // HttpOnly
					)

					c.SetCookie(
						"refresh_token",
						response.Data.SignIn.Tokens.RefreshToken,
						2592000, // 30日
						"/",
						"",
						false, // Secure
						true,  // HttpOnly
					)

					c.Writer.Header().Set("Set-Cookie", "SameSite=Strict")
				}
			}
		}
	}
}
