package main

import (
	"fmt"
	grpczap "github.com/grpc-ecosystem/go-grpc-middleware/logging/zap"
	"github.com/viqueen/besto/apps/product/server/export"
	"go.uber.org/zap"
	"google.golang.org/grpc"
	"log"
	"net"
)

func main() {
	address := 30031

	listener, err := net.Listen("tcp", fmt.Sprintf(":%d", address))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	zapLogger, _ := zap.NewDevelopment()
	defer zapLogger.Sync()

	server := grpc.NewServer(
		grpc.ChainUnaryInterceptor(
			grpczap.UnaryServerInterceptor(zapLogger),
		),
		grpc.ChainStreamInterceptor(),
	)

	export.Bundle(server)

	log.Printf("product grpc server running on port %d", address)
	if serveErr := server.Serve(listener); serveErr != nil {
		log.Fatalf("failed to serve on port %d: %v", address, serveErr)
	}
}
