package main

import (
	"fmt"
	grpc_zap "github.com/grpc-ecosystem/go-grpc-middleware/logging/zap"
	"github.com/viqueen/besto/apps/platform/server/export"
	"github.com/viqueen/besto/apps/platform/server/internal/interceptor"
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

	server := grpc.NewServer(
		grpc.ChainUnaryInterceptor(
			grpc_zap.UnaryServerInterceptor(zapLogger),
			interceptor.UnaryAuthInterceptor,
		),
		grpc.ChainStreamInterceptor(),
	)

	export.Bundle(server)

	log.Printf("platform grpc server running on port %d", address)
	if serveErr := server.Serve(listener); serveErr != nil {
		log.Fatalf("failed to serve on port %d: %v", address, serveErr)
	}
}
