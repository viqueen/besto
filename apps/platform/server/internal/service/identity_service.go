package service

import (
	"context"
	"github.com/gofrs/uuid"
	"github.com/viqueen/besto/_api/go-sdk/platform/identity/v1"
	"github.com/viqueen/besto/apps/platform/server/internal/data"
	libData "github.com/viqueen/besto/lib/go-sdk/data"
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
	entities, err := i.access.IdentityProfile.Reader.ReadMany(map[string]interface{}{
		"profile_id": profile.GetProfileId(),
		"provider":   profile.GetProvider().String(),
	}, libData.PageInfo{PageSize: 1})
	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to read identity profile: %v", err)
	}
	if len(entities) == 0 {
		return nil, status.Errorf(codes.PermissionDenied, "identity profile not permitted")
	}

	// TODO: we need to look up identity by profile
	identity, err := i.access.Identity.Reader.ReadOne(uuid.Must(uuid.NewV4()))
	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to read identity: %v", err)
	}

	return &identityV1.SignInResponse{
		Identity: identity,
	}, nil
}

func (i IdentityService) SignUp(_ context.Context, request *identityV1.SignUpRequest) (*identityV1.SignUpResponse, error) {
	profile := request.GetProfile()
	entities, err := i.access.IdentityProfile.Reader.ReadMany(map[string]interface{}{
		"profile_id": profile.GetProfileId(),
		"provider":   profile.GetProvider().String(),
	}, libData.PageInfo{PageSize: 1})
	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to read identity profile: %v", err)
	}
	if len(entities) > 0 {
		return nil, status.Errorf(codes.AlreadyExists, "identity profile already exists")
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
		Id: uuid.Must(uuid.NewV4()).String(),
		Profiles: []*identityV1.IdentityProfile{
			createdProfile,
		},
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
