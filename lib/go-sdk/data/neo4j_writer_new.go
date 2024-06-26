package data

import (
	"fmt"
	"github.com/neo4j/neo4j-go-driver/neo4j"
	neo4j_client "github.com/viqueen/besto/lib/go-sdk/neo4j-client"
	"github.com/viqueen/besto/lib/go-sdk/slices"
	"golang.org/x/exp/maps"
	"strings"
)

type EntityNeo4jWriterNew[ENTITY interface{}] struct {
	EntityWriter[ENTITY]
	client       *neo4j_client.Neo4jClient
	labels       []string
	entityMapper func(entity *ENTITY) (map[string]interface{}, error)
	recordMapper func(record neo4j.Record) (*ENTITY, error)
}

func NewEntityNeo4jWriterNew[ENTITY interface{}](
	client *neo4j_client.Neo4jClient,
	labels []string,
	entityMapper func(entity *ENTITY) (map[string]interface{}, error),
	recordMapper func(record neo4j.Record) (*ENTITY, error),
) *EntityNeo4jWriterNew[ENTITY] {
	return &EntityNeo4jWriterNew[ENTITY]{
		client:       client,
		labels:       labels,
		entityMapper: entityMapper,
		recordMapper: recordMapper,
	}
}

func (e EntityNeo4jWriterNew[ENTITY]) CreateOne(entity *ENTITY) (*ENTITY, error) {
	entityMap, err := e.entityMapper(entity)
	if err != nil {
		return nil, err
	}
	labels := strings.Join(e.labels, ":")
	fields := slices.Map(maps.Keys(entityMap), func(key string) string {
		return fmt.Sprintf("%s: $%s", key, key)
	})
	joinedFields := strings.Join(fields, ", ")
	createStatement := fmt.Sprintf(`CREATE (t:%s {%s}) RETURN t`, labels, joinedFields)
	result, err := e.client.ExecuteWriteQuery(neo4j_client.Query{
		Statement: createStatement,
		Params:    entityMap,
	})
	if err != nil {
		return nil, err
	}

	hasRecord := result.Next()
	if !hasRecord {
		return nil, fmt.Errorf("entity %s not created", labels)
	}

	record := result.Record()
	createdEntity, err := e.recordMapper(record)
	if err != nil {
		return nil, err
	}
	return createdEntity, nil
}
