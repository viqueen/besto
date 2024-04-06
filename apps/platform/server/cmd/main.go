package main

import (
	"fmt"
	grpczap "github.com/grpc-ecosystem/go-grpc-middleware/logging/zap"
	"github.com/viqueen/besto/apps/platform/server/export"
	"github.com/viqueen/besto/apps/platform/server/internal/interceptor"
	neo4jclient "github.com/viqueen/besto/lib/go-sdk/neo4j-client"
	"go.uber.org/zap"
	"google.golang.org/grpc"
	"log"
	"net"
)

func main() {
	address := 50051
	listener, err := net.Listen("tcp", fmt.Sprintf(":%d", address))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	zapLogger, _ := zap.NewDevelopment()
	defer zapLogger.Sync()

	// Create a new instance of a Neo4j client
	neo4jClient, err := neo4jclient.NewLocalNeo4jClient()
	if err != nil {
		log.Fatalf("failed to create neo4j client : %v", err)
	}

	server := grpc.NewServer(
		grpc.ChainUnaryInterceptor(
			grpczap.UnaryServerInterceptor(zapLogger),
			interceptor.UnaryAuthInterceptor,
		),
		grpc.ChainStreamInterceptor(),
	)

	export.Bundle(server, neo4jClient)

	log.Printf("platform grpc server running on port %d", address)
	if serveErr := server.Serve(listener); serveErr != nil {
		log.Fatalf("failed to serve on port %d: %v", address, serveErr)
	}
}
