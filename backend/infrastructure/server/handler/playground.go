package handler

import (
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/gin-gonic/gin"
)

func NewPlaygroundHandler() gin.HandlerFunc {
	h := playground.Handler("GraphQL Playground", "/query")

	return func(c *gin.Context) {
		h.ServeHTTP(c.Writer, c.Request)
	}
}
