package data

import (
	"github.com/gofrs/uuid"
	"github.com/neo4j/neo4j-go-driver/neo4j"
	identityV1 "github.com/viqueen/besto/_api/go-sdk/platform/identity/v1"
	libData "github.com/viqueen/besto/lib/go-sdk/data"
	neo4jclient "github.com/viqueen/besto/lib/go-sdk/neo4j-client"
	"time"
)

type Neo4jIdentityEntity struct {
	entityName   string
	entityFields []string
	client       *neo4jclient.Neo4jClient
}

func NewNeo4jIdentityEntity(client *neo4jclient.Neo4jClient) *Neo4jIdentityEntity {
	return &Neo4jIdentityEntity{
		entityName:   "Identity",
		entityFields: []string{"id"},
		client:       client,
	}
}

// --- READER ---

func (r *Neo4jIdentityEntity) Reader() libData.EntityReader[identityV1.Identity] {
	return libData.NewEntityNeo4jReader[identityV1.Identity](
		r.client,
		r.entityName,
		r.entityFields,
		identityReadCtx,
		recordToIdentity,
	)
}

func identityReadCtx(identity *identityV1.Identity) libData.EntityReadCtx {
	profile := identity.GetProfile()
	if profile == nil {
		return libData.EntityReadCtx{
			From: &neo4jclient.Node{
				Id:     uuid.FromStringOrNil(identity.Id),
				Labels: []string{"Identity"},
				Props:  map[string]interface{}{},
			},
		}
	}
	profileReadCtx := identityProfileReadCtx(profile)
	return libData.EntityReadCtx{
		From: &neo4jclient.Node{
			Id:     uuid.FromStringOrNil(identity.Id),
			Labels: []string{"Identity"},
			Props:  map[string]interface{}{},
		},
		To: profileReadCtx.From,
		Relationship: &neo4jclient.Relationship{
			Name: "HAS_PROFILE",
		},
	}
}

func recordToIdentity(record neo4j.Record) *identityV1.Identity {
	return &identityV1.Identity{
		Id: record.GetByIndex(0).(string),
	}
}

// --- WRITER ---

func (r *Neo4jIdentityEntity) Writer() libData.EntityWriter[identityV1.Identity] {
	return libData.NewEntityNeo4jWriter[identityV1.Identity](
		r.client,
		r.entityName,
		r.entityFields,
		identityWriteCtx,
	)
}

func identityWriteCtx(identity *identityV1.Identity) libData.EntityWriteCtx {
	profile := identity.GetProfile()
	return libData.EntityWriteCtx{
		Matches: &neo4jclient.Node{
			Id:     uuid.FromStringOrNil(profile.GetId()),
			Labels: []string{"IdentityProfile"},
			Props: map[string]interface{}{
				"profile_id": profile.GetProfileId(),
				"provider":   profile.GetProvider(),
			},
		},
		Creates: &neo4jclient.Node{
			Id:     uuid.FromStringOrNil(identity.Id),
			Labels: []string{"Identity"},
			Props:  map[string]interface{}{},
		},
		RelateCreatedToMatched: &neo4jclient.Relationship{
			Name: "HAS_PROFILE",
			Props: map[string]interface{}{
				"linked_at": time.Now().Format(time.RFC3339),
			},
		},
	}
}
