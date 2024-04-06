package data

import (
	"fmt"
	"github.com/gofrs/uuid"
	"github.com/neo4j/neo4j-go-driver/neo4j"
	neo4jclient "github.com/viqueen/besto/lib/go-sdk/neo4j-client"
)

// EntityNeo4jReader is a concrete implementation of the EntityReader interface for Neo4j.
type EntityNeo4jReader[ENTITY interface{}] struct {
	EntityReader[ENTITY]

	client       *neo4jclient.Neo4jClient
	entityName   string
	entityFields []string
	recordMapper func(record neo4j.Record) *ENTITY
}

// NewEntityNeo4jReader creates a new instance of EntityNeo4jReader.
func NewEntityNeo4jReader[ENTITY interface{}](
	client *neo4jclient.Neo4jClient,
	entityName string,
	entityFields []string,
	recordMapper func(record neo4j.Record) *ENTITY,
) *EntityNeo4jReader[ENTITY] {
	return &EntityNeo4jReader[ENTITY]{
		client:       client,
		entityName:   entityName,
		entityFields: entityFields,
		recordMapper: recordMapper,
	}
}

// ReadOne reads a single entity from Neo4j by ID.
func (r *EntityNeo4jReader[ENTITY]) ReadOne(id uuid.UUID) (*ENTITY, error) {
	qb := neo4jclient.NewQueryBuilder()
	qb = qb.MatchNode("t", neo4jclient.Node{Id: id, Labels: []string{r.entityName}}).
		Return("t").
		WithPagination(neo4jclient.Pagination{
			Limit: 1,
		})

	result, err := r.client.ExecuteReadQuery(qb.BuildQuery())
	if err != nil {
		return nil, err
	}

	hasRecord := result.Next()
	if !hasRecord {
		return nil, fmt.Errorf("entity %s with ID %s not found", r.entityName, id)
	}

	record := result.Record()
	entity := r.recordMapper(record)

	return entity, nil
}

// ReadMany reads multiple entities from Neo4j.
func (r *EntityNeo4jReader[ENTITY]) ReadMany(params map[string]interface{}, pageInfo PageInfo) ([]*ENTITY, error) {
	qb := neo4jclient.NewQueryBuilder()
	qb = qb.MatchNode("t", neo4jclient.Node{Labels: []string{r.entityName}}).
		Return("t").
		WithPagination(neo4jclient.Pagination{
			Offset: pageInfo.PageOffset,
			Limit:  pageInfo.PageSize,
		})
	result, err := r.client.ExecuteReadQuery(qb.BuildQuery())
	if err != nil {
		return nil, err
	}

	var entities []*ENTITY
	for result.Next() {
		record := result.Record()
		entity := r.recordMapper(record)
		entities = append(entities, entity)
	}

	return entities, nil
}
