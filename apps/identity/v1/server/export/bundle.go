package export

import (
	identityV1 "github.com/viqueen/besto/_api/go-sdk/identity/v1"
	"github.com/viqueen/besto/apps/identity/server/internal/data"
	"github.com/viqueen/besto/apps/identity/server/internal/service"
	neo4jclient "github.com/viqueen/besto/lib/go-sdk/neo4j-client"
	"google.golang.org/grpc"
)

func Bundle(server *grpc.Server, neo4jClient *neo4jclient.Neo4jClient) {
	access := data.NewNeo4jIdentityAccess(neo4jClient)
	identityService := service.NewIdentityService(service.IdentityServiceConfig{
		Access: access,
	})
	identityV1.RegisterIdentityServiceServer(server, identityService)
}
