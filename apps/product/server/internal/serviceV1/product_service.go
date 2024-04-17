package serviceV1

import (
	context "context"
	productV1 "github.com/viqueen/besto/_api/go-sdk/product/v1"
)

type ProductService struct {
	productV1.UnimplementedProductServiceServer
}

func NewProductService() *ProductService {
	return &ProductService{}
}

func (p ProductService) GetProduct(ctx context.Context, request *productV1.GetProductRequest) (*productV1.GetProductResponse, error) {
	return &productV1.GetProductResponse{
		Product: &productV1.Product{
			Id:   "V1: " + request.GetId(),
			Name: "Product V1: ",
		},
	}, nil
}
