package data

import (
	"fmt"
	"github.com/gofrs/uuid"
	"github.com/neo4j/neo4j-go-driver/neo4j"
	neo4jclient "github.com/viqueen/besto/lib/go-sdk/neo4j-client"
	"github.com/viqueen/besto/lib/go-sdk/slices"
	"strings"
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
	fields := slices.Map(r.entityFields, func(field string) string {
		return fmt.Sprintf("t.%s", field)
	})
	joined := strings.Join(fields, ", ")
	query := fmt.Sprintf("MATCH (t:%s {id: $id}) RETURN %s LIMIT 1", r.entityName, joined)
	params := map[string]interface{}{
		"id": id.String(),
	}

	result, err := r.client.ExecuteReadQuery(query, params)
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
	fields := slices.Map(r.entityFields, func(field string) string {
		return fmt.Sprintf("t.%s", field)
	})
	joinedFields := strings.Join(fields, ", ")
	filters := make([]string, len(params))
	for key, _ := range params {
		filters = append(filters, fmt.Sprintf("%s = $%s", key, key))
	}
	joinedFilers := strings.Join(filters, ", ")
	query := fmt.Sprintf("MATCH (t:%s {%s}) RETURN %s SKIP %d LIMIT %d",
		r.entityName,
		joinedFilers,
		joinedFields,
		pageInfo.PageOffset,
		pageInfo.PageSize,
	)
	result, err := r.client.ExecuteReadQuery(query, nil)
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

// EntityNeo4jWriter is a concrete implementation of the EntityWriter interface for Neo4j.
type EntityNeo4jWriter[ENTITY interface{}] struct {
	EntityWriter[ENTITY]
	client *neo4jclient.Neo4jClient

	entityName   string
	entityFields []string
	paramsMapper func(entity *ENTITY) map[string]interface{}
}

// NewEntityNeo4jWriter creates a new instance of EntityNeo4jWriter.
func NewEntityNeo4jWriter[ENTITY interface{}](
	client *neo4jclient.Neo4jClient,
	entityName string,
	entityFields []string,
	paramsMapper func(entity *ENTITY) map[string]interface{},
) *EntityNeo4jWriter[ENTITY] {
	return &EntityNeo4jWriter[ENTITY]{
		client:       client,
		entityName:   entityName,
		entityFields: entityFields,
		paramsMapper: paramsMapper,
	}
}

// CreateOne creates a single entity in Neo4j.
func (w *EntityNeo4jWriter[ENTITY]) CreateOne(entity *ENTITY) (*ENTITY, error) {
	fields := slices.Map(w.entityFields, func(field string) string {
		return fmt.Sprintf("%s: $%s", field, field)
	})
	joined := strings.Join(fields, ", ")
	query := fmt.Sprintf("CREATE (t:%s {%s})", w.entityName, joined)
	params := w.paramsMapper(entity)
	err := w.client.ExecuteWriteQuery(query, params)

	if err != nil {
		return nil, err
	}

	return entity, nil
}
