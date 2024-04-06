package data

import (
	"github.com/neo4j/neo4j-go-driver/neo4j"
	identityV1 "github.com/viqueen/besto/_api/go-sdk/platform/identity/v1"
	libData "github.com/viqueen/besto/lib/go-sdk/data"
	neo4jclient "github.com/viqueen/besto/lib/go-sdk/neo4j-client"
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

func (r *Neo4jIdentityEntity) Reader() libData.EntityReader[identityV1.Identity] {
	return libData.NewEntityNeo4jReader[identityV1.Identity](
		r.client,
		r.entityName,
		r.entityFields,
		recordToIdentity,
	)
}

func (r *Neo4jIdentityEntity) Writer() libData.EntityWriter[identityV1.Identity] {
	return libData.NewEntityNeo4jWriter[identityV1.Identity](
		r.client,
		r.entityName,
		r.entityFields,
		identityToRecord,
	)
}

func recordToIdentity(record neo4j.Record) *identityV1.Identity {
	return &identityV1.Identity{
		Id: record.GetByIndex(0).(string),
	}
}

func identityToRecord(identity *identityV1.Identity) map[string]interface{} {
	return map[string]interface{}{
		"id": identity.Id,
	}
}
