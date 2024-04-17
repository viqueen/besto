package serviceV2

import (
	context "context"
	"github.com/viqueen/besto/_api/go-sdk/product/v2"
)

type ProductService struct {
	productV2.UnimplementedProductServiceServer
}

func NewProductService() *ProductService {
	return &ProductService{}
}

func (p ProductService) GetProduct(_ context.Context, request *productV2.GetProductRequest) (*productV2.GetProductResponse, error) {
	return &productV2.GetProductResponse{
		Product: &productV2.Product{
			Id:          "V2: " + request.GetId(),
			Name:        "Product V2: " + request.GetName(),
			Description: "Product V2 Description",
		},
	}, nil
}
