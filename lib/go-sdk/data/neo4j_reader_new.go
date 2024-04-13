package data

import (
	"fmt"
	"github.com/gofrs/uuid"
	"github.com/neo4j/neo4j-go-driver/neo4j"
	neo4jclient "github.com/viqueen/besto/lib/go-sdk/neo4j-client"
	"github.com/viqueen/besto/lib/go-sdk/slices"
	"golang.org/x/exp/maps"
	"strings"
)

type EntityNeo4jReaderNew[ENTITY interface{}] struct {
	EntityReader[ENTITY]
	client       *neo4jclient.Neo4jClient
	labels       []string
	recordMapper func(record neo4j.Record) (*ENTITY, error)
}

func NewEntityNeo4jReaderNew[ENTITY interface{}](
	client *neo4jclient.Neo4jClient,
	labels []string,
	recordMapper func(record neo4j.Record) (*ENTITY, error)) *EntityNeo4jReaderNew[ENTITY] {
	return &EntityNeo4jReaderNew[ENTITY]{
		client:       client,
		labels:       labels,
		recordMapper: recordMapper,
	}
}

func (e EntityNeo4jReaderNew[ENTITY]) ReadOne(id uuid.UUID) (*ENTITY, error) {
	labels := strings.Join(e.labels, ":")
	matchStatement := fmt.Sprintf(`MATCH (t:%s {id: $id}) RETURN t`, labels)
	matchParams := map[string]interface{}{"id": id.String()}
	result, err := e.client.ExecuteReadQuery(neo4jclient.Query{
		Statement: matchStatement,
		Params:    matchParams,
	})
	if err != nil {
		return nil, err
	}

	hasRecord := result.Next()
	if !hasRecord {
		return nil, fmt.Errorf("entity %s with ID %s not found", labels, id)
	}

	record := result.Record()
	entity, err := e.recordMapper(record)
	if err != nil {
		return nil, err
	}
	return entity, nil
}

func (e EntityNeo4jReaderNew[ENTITY]) ReadMany(params map[string]interface{}, pageInfo PageInfo) ([]*ENTITY, error) {
	offset := 0
	limit := 100
	if pageInfo.PageOffset > 0 {
		offset = int(pageInfo.PageOffset)
	}
	if pageInfo.PageSize > 0 {
		limit = int(pageInfo.PageSize)
	}

	labels := strings.Join(e.labels, ":")
	fields := slices.Map(maps.Keys(params), func(key string) string {
		return fmt.Sprintf("%s : $%s", key, key)
	})
	joinedFields := strings.Join(fields, ", ")
	matchStatement := fmt.Sprintf(`MATCH (t:%s {%s}) RETURN t SKIP %d LIMIT %d`, labels, joinedFields, offset, limit)
	result, err := e.client.ExecuteReadQuery(neo4jclient.Query{Statement: matchStatement, Params: params})
	if err != nil {
		return nil, err
	}

	entities := make([]*ENTITY, 0)
	for result.Next() {
		record := result.Record()
		entity, mapperErr := e.recordMapper(record)
		if mapperErr != nil {
			return nil, mapperErr
		}
		entities = append(entities, entity)
	}
	return entities, nil
}

func (e EntityNeo4jReaderNew[ENTITY]) Filter(entity *ENTITY) ([]*ENTITY, error) {
	//TODO implement me
	panic("implement me")
}
