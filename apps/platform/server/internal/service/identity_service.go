package service

import (
	context "context"
	"github.com/viqueen/besto/_api/go-sdk/platform/identity/v1"
)

type IdentityService struct {
	identityV1.UnimplementedIdentityServiceServer
}

func NewIdentityService() *IdentityService {
	return &IdentityService{}
}

func (i IdentityService) SignUp(ctx context.Context, request *identityV1.SignUpRequest) (*identityV1.SignUpResponse, error) {
	//TODO implement me
	panic("implement me")
}

func (i IdentityService) SignIn(ctx context.Context, request *identityV1.SignInRequest) (*identityV1.SignInResponse, error) {
	//TODO implement me
	panic("implement me")
}
