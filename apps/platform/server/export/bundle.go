package export

import (
	identityV1 "github.com/viqueen/besto/_api/go-sdk/platform/identity/v1"
	"github.com/viqueen/besto/apps/platform/server/internal/service"
	"google.golang.org/grpc"
)

func Bundle(server *grpc.Server) {
	identityService := service.NewIdentityService()
	identityV1.RegisterIdentityServiceServer(server, identityService)
}
