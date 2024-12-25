package middleware

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func SetRefreshTokenCookie() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Next()

		// GraphQLのレスポンスからリフレッシュトークンを取得
		if c.Writer.Status() == http.StatusOK {
			var response struct {
				Data struct {
					SignIn struct {
						Success bool
						Tokens  struct {
							RefreshToken string
						}
					}
				}
			}

			if err := c.ShouldBindJSON(&response); err == nil {
				if response.Data.SignIn.Success && response.Data.SignIn.Tokens.RefreshToken != "" {
					// HttpOnlyかつSecureなCookieを設定
					c.SetCookie(
						"refresh_token",
						response.Data.SignIn.Tokens.RefreshToken,
						int((30 * 24 * time.Hour).Seconds()), // 30日
						"/",
						"",    // ドメイン
						false, // Secure
						true,  // HttpOnly
					)
				}
			}
		}
	}
}
