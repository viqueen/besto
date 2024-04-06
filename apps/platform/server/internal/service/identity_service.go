package service

import (
	"context"
	"github.com/viqueen/besto/_api/go-sdk/platform/identity/v1"
	"github.com/viqueen/besto/apps/platform/server/internal/data"
)

type IdentityService struct {
	identityV1.UnimplementedIdentityServiceServer
	Access *data.IdentityAccess
}

func NewIdentityService() *IdentityService {
	return &IdentityService{}
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
