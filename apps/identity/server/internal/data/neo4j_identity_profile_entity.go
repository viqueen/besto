package data

import (
	"encoding/json"
	"github.com/gofrs/uuid"
	"github.com/neo4j/neo4j-go-driver/neo4j"
	identityV1 "github.com/viqueen/besto/_api/go-sdk/identity/v1"
	libData "github.com/viqueen/besto/lib/go-sdk/data"
	neo4jclient "github.com/viqueen/besto/lib/go-sdk/neo4j-client"
	"strings"
)

type Neo4jIdentityProfileEntity struct {
	entityName   string
	entityFields []string
	client       *neo4jclient.Neo4jClient
}

func NewNeo4jIdentityProfileEntity(client *neo4jclient.Neo4jClient) *Neo4jIdentityProfileEntity {
	return &Neo4jIdentityProfileEntity{
		entityName:   "IdentityProfile",
		entityFields: []string{"id", "profile_id", "provider", "profile"},
		client:       client,
	}
}

// --- READER ---

func (r *Neo4jIdentityProfileEntity) Reader() libData.EntityReader[identityV1.IdentityProfile] {
	return libData.NewEntityNeo4jReader[identityV1.IdentityProfile](
		r.client,
		r.entityName,
		r.entityFields,
		identityProfileReadCtx,
		recordToIdentityProfile,
	)
}

func identityProfileReadCtx(entity *identityV1.IdentityProfile) libData.EntityReadCtx {
	props := make(map[string]interface{})
	if entity.GetProfileId() != "" {
		props["profile_id"] = entity.ProfileId
	}
	labels := []string{"IdentityProfile"}
	if entity.GetProvider() != identityV1.IdentityProvider_UNSPECIFIED {
		props["provider"] = entity.Provider.String()
		labels = append(labels, entity.Provider.String())
	}
	return libData.EntityReadCtx{
		From: &neo4jclient.Node{
			Id:     uuid.FromStringOrNil(entity.Id),
			Labels: labels,
			Props:  props,
		},
	}
}

func recordToIdentityProfile(record neo4j.Record) *identityV1.IdentityProfile {
	node, ok := record.GetByIndex(0).(neo4j.Node)
	if !ok {
		return nil
	}

	props := node.Props()
	provider := stringToIdentityProvider(props["provider"].(string))
	id := props["id"].(string)
	profileId := props["profile_id"].(string)
	profile := props["profile"].([]byte)
	switch provider {
	case identityV1.IdentityProvider_GITHUB:
		githubProfile, err := stringToGithubProfile(profile)
		if err != nil {
			return nil
		}
		return &identityV1.IdentityProfile{
			Id:        id,
			ProfileId: profileId,
			Provider:  provider,
			Profile: &identityV1.IdentityProfile_Github{
				Github: githubProfile,
			},
		}
	case identityV1.IdentityProvider_GOOGLE:
		googleProfile, err := stringToGoogleProfile(profile)
		if err != nil {
			return nil
		}
		return &identityV1.IdentityProfile{
			Id:        id,
			ProfileId: profileId,
			Provider:  provider,
			Profile: &identityV1.IdentityProfile_Google{
				Google: googleProfile,
			},
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

func stringToGithubProfile(value []byte) (*identityV1.GithubProfile, error) {
	var profile identityV1.GithubProfile
	err := json.Unmarshal(value, &profile)
	if err != nil {
		return nil, err
	}
	return &profile, nil
}

func stringToGoogleProfile(value []byte) (*identityV1.GoogleProfile, error) {
	var profile identityV1.GoogleProfile
	err := json.Unmarshal(value, &profile)
	if err != nil {
		return nil, err
	}
	return &profile, nil
}

// --- WRITER ---

func (r *Neo4jIdentityProfileEntity) Writer() libData.EntityWriter[identityV1.IdentityProfile] {
	return libData.NewEntityNeo4jWriter[identityV1.IdentityProfile](
		r.client,
		r.entityName,
		r.entityFields,
		identityProfileWriteCtx,
	)
}

func identityProfileWriteCtx(entity *identityV1.IdentityProfile) libData.EntityWriteCtx {
	var profile []byte
	switch entity.GetProvider() {
	case identityV1.IdentityProvider_GITHUB:
		profile, _ = json.Marshal(entity.GetGithub())
	case identityV1.IdentityProvider_GOOGLE:
		profile, _ = json.Marshal(entity.GetGoogle())
	}
	return libData.EntityWriteCtx{
		Creates: &neo4jclient.Node{
			Id:     uuid.FromStringOrNil(entity.Id),
			Labels: []string{"IdentityProfile", entity.GetProvider().String()},
			Props: map[string]interface{}{
				"profile_id": entity.ProfileId,
				"provider":   entity.Provider.String(),
				"profile":    profile,
			},
		},
	}
}
