package interceptor

import (
	"context"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
)

func UnaryAuthInterceptor(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {
	// extract metadata from context
	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return nil, status.Error(codes.Unauthenticated, "missing metadata")
	}
	// extract session from metadata
	session := md["session.id"]
	if len(session) == 0 {
		return nil, status.Error(codes.Unauthenticated, "missing session")
	}
	// TODO: validate session
	return nil, status.Error(codes.Unimplemented, "not implemented")
}
