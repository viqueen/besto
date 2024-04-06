package data

import (
	"encoding/json"
	"github.com/neo4j/neo4j-go-driver/neo4j"
	identityV1 "github.com/viqueen/besto/_api/go-sdk/platform/identity/v1"
	libData "github.com/viqueen/besto/lib/go-sdk/data"
	neo4jclient "github.com/viqueen/besto/lib/go-sdk/neo4j-client"
	"strings"
)

type Neo4jIdentityProfile struct {
	entityName   string
	entityFields []string
	client       *neo4jclient.Neo4jClient
}

func NewNeo4jIdentityProfile(client *neo4jclient.Neo4jClient) *Neo4jIdentityProfile {
	return &Neo4jIdentityProfile{
		entityName:   "IdentityProfile",
		entityFields: []string{"id", "profile_id", "provider", "profile"},
		client:       client,
	}
}

func (r *Neo4jIdentityProfile) Reader() libData.EntityReader[identityV1.IdentityProfile] {
	return libData.NewEntityNeo4jReader[identityV1.IdentityProfile](
		r.client,
		r.entityName,
		r.entityFields,
		recordToIdentityProfile,
	)
}

func (r *Neo4jIdentityProfile) Writer() libData.EntityWriter[identityV1.IdentityProfile] {
	return libData.NewEntityNeo4jWriter[identityV1.IdentityProfile](
		r.client,
		r.entityName,
		r.entityFields,
		identityProfileToRecord,
	)
}

func recordToIdentityProfile(record neo4j.Record) *identityV1.IdentityProfile {
	provider := stringToIdentityProvider(record.GetByIndex(2).(string))
	switch provider {
	case identityV1.IdentityProvider_GITHUB:
		profile, err := stringToGithubProfile(record.GetByIndex(3).(string))
		if err != nil {
			return nil
		}
		return &identityV1.IdentityProfile{
			Id:        record.GetByIndex(0).(string),
			ProfileId: record.GetByIndex(1).(string),
			Provider:  provider,
			Profile: &identityV1.IdentityProfile_Github{
				Github: profile,
			},
		}
	case identityV1.IdentityProvider_GOOGLE:
		profile, err := stringToGoogleProfile(record.GetByIndex(3).(string))
		if err != nil {
			return nil
		}
		return &identityV1.IdentityProfile{
			Id:        record.GetByIndex(0).(string),
			ProfileId: record.GetByIndex(1).(string),
			Provider:  provider,
			Profile: &identityV1.IdentityProfile_Google{
				Google: profile,
			},
		}
	default:
		return nil
	}
}

func identityProfileToRecord(entity *identityV1.IdentityProfile) map[string]interface{} {
	switch entity.GetProvider() {
	case identityV1.IdentityProvider_GITHUB:
		profile, err := json.Marshal(entity.GetGithub())
		if err != nil {
			return nil
		}
		return map[string]interface{}{
			"id":         entity.Id,
			"profile_id": entity.ProfileId,
			"provider":   entity.Provider.String(),
			"profile":    profile,
		}
	case identityV1.IdentityProvider_GOOGLE:
		profile, err := json.Marshal(entity.GetGoogle())
		if err != nil {
			return nil
		}
		return map[string]interface{}{
			"id":         entity.Id,
			"profile_id": entity.ProfileId,
			"provider":   entity.Provider.String(),
			"profile":    profile,
		}
	default:
		return nil
	}
}

func stringToIdentityProvider(value string) identityV1.IdentityProvider {
	switch strings.ToLower(value) {
	case "google":
		return identityV1.IdentityProvider_GOOGLE
	case "github":
		return identityV1.IdentityProvider_GITHUB
	default:
		return identityV1.IdentityProvider_UNSPECIFIED
	}
}

func stringToGithubProfile(value string) (*identityV1.GithubProfile, error) {
	var profile identityV1.GithubProfile
	err := json.Unmarshal([]byte(value), &profile)
	if err != nil {
		return nil, err
	}
	return &profile, nil
}

func stringToGoogleProfile(value string) (*identityV1.GoogleProfile, error) {
	var profile identityV1.GoogleProfile
	err := json.Unmarshal([]byte(value), &profile)
	if err != nil {
		return nil, err
	}
	return &profile, nil
}
