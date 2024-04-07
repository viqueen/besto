package service

import (
	"context"
	"github.com/gofrs/uuid"
	"github.com/viqueen/besto/_api/go-sdk/identity/v1"
	"github.com/viqueen/besto/apps/identity/server/internal/data"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type IdentityService struct {
	identityV1.UnimplementedIdentityServiceServer
	access *data.IdentityAccess
}

type IdentityServiceConfig struct {
	Access *data.IdentityAccess
}

func NewIdentityService(config IdentityServiceConfig) *IdentityService {
	return &IdentityService{
		access: config.Access,
	}
}

func (i IdentityService) SignIn(_ context.Context, request *identityV1.SignInRequest) (*identityV1.SignInResponse, error) {
	profile := request.GetProfile()
	identities, err := i.access.Identity.Reader.Filter(&identityV1.Identity{
		Profile: &identityV1.IdentityProfile{
			ProfileId: profile.GetProfileId(),
			Provider:  profile.GetProvider(),
		},
	})

	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to filter identity: %v", err)
	}

	if len(identities) > 1 {
		return nil, status.Errorf(codes.Internal, "multiple identities found")
	}

	if len(identities) == 0 {
		return nil, status.Errorf(codes.PermissionDenied, "identity not permitted")
	}

	return &identityV1.SignInResponse{
		Identity: identities[0],
	}, nil
}

func (i IdentityService) SignUp(_ context.Context, request *identityV1.SignUpRequest) (*identityV1.SignUpResponse, error) {
	profile := request.GetProfile()
	identities, err := i.access.Identity.Reader.Filter(&identityV1.Identity{
		Profile: &identityV1.IdentityProfile{
			ProfileId: profile.GetProfileId(),
			Provider:  profile.GetProvider(),
		},
	})

	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to filter identity: %v", err)
	}

	if len(identities) > 1 {
		return nil, status.Errorf(codes.Internal, "multiple identities found")
	}

	if len(identities) == 1 {
		return &identityV1.SignUpResponse{
			Identity: identities[0],
		}, nil
	}

	createdProfile, err := i.access.IdentityProfile.Writer.CreateOne(&identityV1.IdentityProfile{
		Id:        uuid.Must(uuid.NewV4()).String(),
		ProfileId: profile.GetProfileId(),
		Provider:  profile.GetProvider(),
		Profile:   profile.GetProfile(),
	})
	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to create identity profile: %v", err)
	}

	identity, err := i.access.Identity.Writer.CreateOne(&identityV1.Identity{
		Id:      uuid.Must(uuid.NewV4()).String(),
		Profile: createdProfile,
	})
	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to create identity: %v", err)
	}

	return &identityV1.SignUpResponse{
		Identity: identity,
	}, nil
}

func (i IdentityService) SignOut(ctx context.Context, request *identityV1.SignOutRequest) (*identityV1.SignOutResponse, error) {
	//TODO implement me
	panic("implement me")
}
