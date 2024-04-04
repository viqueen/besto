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

func (i IdentityService) GetIdentity(ctx context.Context, request *identityV1.GetIdentityRequest) (*identityV1.GetIdentityResponse, error) {
	return &identityV1.GetIdentityResponse{
		Identity: &identityV1.Identity{
			Id: "1",
		},
	}, nil
}

func (i IdentityService) SignIn(ctx context.Context, request *identityV1.SignInRequest) (*identityV1.SignInResponse, error) {
	//TODO implement me
	panic("implement me")
}

func (i IdentityService) SignUp(ctx context.Context, request *identityV1.SignUpRequest) (*identityV1.SignUpResponse, error) {
	//TODO implement me
	panic("implement me")
}

func (i IdentityService) SignOut(ctx context.Context, request *identityV1.SignOutRequest) (*identityV1.SignOutResponse, error) {
	//TODO implement me
	panic("implement me")
}
