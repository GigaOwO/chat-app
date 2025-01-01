package server

import (
	"api/graph/resolvers"
	"api/infrastructure/server/handler"
	"api/infrastructure/server/middleware"
	"log"

	"github.com/gin-gonic/gin"
)

type Server struct {
	engine *gin.Engine
	port   string
}

func NewServer(port string, resolver *resolvers.Resolver) *Server {
	engine := gin.Default()

	engine.Use(middleware.CorsMiddleware())
	engine.Use(middleware.GinContextToContextMiddleware())
	engine.Use(middleware.SetAuthCookies())

	engine.POST("/query", handler.NewGraphQLHandler(resolver))
	engine.GET("/", handler.NewPlaygroundHandler())

	return &Server{
		engine: engine,
		port:   port,
	}
}

func (s *Server) Start() error {
	log.Printf("GraphQLサーバーを http://localhost:%s で起動します", s.port)
	return s.engine.Run(":" + s.port)
}
