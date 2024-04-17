package export

import (
	productV1 "github.com/viqueen/besto/_api/go-sdk/product/v1"
	productV2 "github.com/viqueen/besto/_api/go-sdk/product/v2"
	"github.com/viqueen/besto/apps/product/server/internal/serviceV1"
	"github.com/viqueen/besto/apps/product/server/internal/serviceV2"
	"google.golang.org/grpc"
)

func Bundle(server *grpc.Server) {
	productServiceV1 := serviceV1.NewProductService()
	productV1.RegisterProductServiceServer(server, productServiceV1)

	productServiceV2 := serviceV2.NewProductService()
	productV2.RegisterProductServiceServer(server, productServiceV2)
}
