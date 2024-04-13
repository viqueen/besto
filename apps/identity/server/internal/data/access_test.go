package data_test

import (
	"github.com/gofrs/uuid"
	"github.com/stretchr/testify/require"
	identityV1 "github.com/viqueen/besto/_api/go-sdk/identity/v1"
	"github.com/viqueen/besto/apps/identity/server/internal/data"
	libData "github.com/viqueen/besto/lib/go-sdk/data"
	neo4jclient "github.com/viqueen/besto/lib/go-sdk/neo4j-client"
	"testing"
)

func TestIdentityProfileEntity(t *testing.T) {
	client, err := neo4jclient.NewTestNeo4jClient()
	require.NoError(t, err)

	access := data.NewNeo4jIdentityProfileEntity(client)

	entityId := uuid.Must(uuid.NewV4())
	newEntity := &identityV1.IdentityProfile{
		Id:        entityId.String(),
		ProfileId: uuid.Must(uuid.NewV4()).String(),
		Provider:  identityV1.IdentityProvider_GITHUB,
		Profile: &identityV1.IdentityProfile_Github{
			Github: &identityV1.GithubProfile{
				Login: "viqueen",
			},
		},
	}

	created, err := access.Writer().CreateOne(newEntity)
	require.NoError(t, err)
	require.NotNil(t, created)
	require.Equal(t, newEntity, created)

	foundById, err := access.Reader().ReadOne(entityId)
	require.NoError(t, err)
	require.NotNil(t, foundById)
	require.Equal(t, created, foundById)

	foundByProfileId, err := access.Reader().ReadMany(map[string]interface{}{"profile_id": newEntity.ProfileId}, libData.PageInfo{})
	require.NoError(t, err)
	require.NotNil(t, foundByProfileId)
	require.Len(t, foundByProfileId, 1)
	require.Equal(t, created, foundByProfileId[0])
}

func TestIdentityEntity(t *testing.T) {
	client, err := neo4jclient.NewTestNeo4jClient()
	require.NoError(t, err)

	identityProfile := data.NewNeo4jIdentityProfileEntity(client)
	identity := data.NewNeo4jIdentityEntity(client)

	newProfile := &identityV1.IdentityProfile{
		Id:        uuid.Must(uuid.NewV4()).String(),
		ProfileId: uuid.Must(uuid.NewV4()).String(),
		Provider:  identityV1.IdentityProvider_GITHUB,
		Profile: &identityV1.IdentityProfile_Github{
			Github: &identityV1.GithubProfile{
				Login: "viqueen",
			},
		},
	}

	createdProfile, err := identityProfile.Writer().CreateOne(newProfile)
	require.NoError(t, err)
	require.NotNil(t, createdProfile)
	require.Equal(t, newProfile, createdProfile)

	newIdentity := &identityV1.Identity{
		Id:      uuid.Must(uuid.NewV4()).String(),
		Profile: createdProfile,
	}

	createdIdentity, err := identity.Writer().CreateOne(newIdentity)
	require.NoError(t, err)
	require.NotNil(t, createdIdentity)
	require.Equal(t, newIdentity, createdIdentity)
}
