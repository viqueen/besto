package data

import (
	identityV1 "github.com/viqueen/besto/_api/go-sdk/platform/identity/v1"
	libData "github.com/viqueen/besto/lib/go-sdk/data"
	neo4jclient "github.com/viqueen/besto/lib/go-sdk/neo4j-client"
)

func NewNeo4jIdentityAccess(client *neo4jclient.Neo4jClient) *IdentityAccess {
	identityProfile := NewNeo4jIdentityProfile(client)
	return &IdentityAccess{
		IdentityProfile: &libData.EntityAccess[identityV1.IdentityProfile]{
			Reader: identityProfile.Reader(),
			Writer: identityProfile.Writer(),
		},
	}
}
