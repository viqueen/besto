package data_test

import (
	"github.com/gofrs/uuid"
	"github.com/stretchr/testify/require"
	identityV1 "github.com/viqueen/besto/_api/go-sdk/identity/v1"
	"github.com/viqueen/besto/apps/identity/server/internal/data"
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

	foundByProfileId, err := access.Reader().Filter(&identityV1.IdentityProfile{
		ProfileId: newEntity.ProfileId,
	})
	require.NoError(t, err)
	require.NotNil(t, foundByProfileId)
	require.Len(t, foundByProfileId, 1)
	require.Equal(t, created, foundByProfileId[0])
}
