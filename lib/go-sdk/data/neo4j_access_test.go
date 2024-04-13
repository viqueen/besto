package data_test

import (
	"github.com/gofrs/uuid"
	"github.com/neo4j/neo4j-go-driver/neo4j"
	"github.com/stretchr/testify/require"
	"github.com/viqueen/besto/lib/go-sdk/data"
	neo4jclient "github.com/viqueen/besto/lib/go-sdk/neo4j-client"
	"strings"
	"testing"
)

type TestEntity struct {
	Id   string
	Name string
}

func testRecordMapper(record neo4j.Record) (*TestEntity, error) {
	node := record.GetByIndex(0).(neo4j.Node)
	props := node.Props()
	return &TestEntity{
		Id:   props["id"].(string),
		Name: props["name"].(string),
	}, nil
}

func testEntityMapper(entity *TestEntity) (map[string]interface{}, error) {
	return map[string]interface{}{
		"id":   entity.Id,
		"name": entity.Name,
	}, nil
}

func TestEntityNeo4jAccess(t *testing.T) {
	client, err := neo4jclient.NewTestNeo4jClient()
	require.NoError(t, err)

	entityName := "e" + strings.ReplaceAll(uuid.Must(uuid.NewV4()).String(), "-", "")
	reader := data.NewEntityNeo4jReaderNew[TestEntity](client, []string{entityName}, testRecordMapper)
	writer := data.NewEntityNeo4jWriterNew[TestEntity](client, []string{entityName}, testEntityMapper, testRecordMapper)

	entityId := uuid.Must(uuid.NewV4())
	entity := &TestEntity{Id: entityId.String(), Name: "test"}

	createdEntity, err := writer.CreateOne(entity)
	require.NoError(t, err)
	require.Equal(t, entity, createdEntity)

	readEntity, err := reader.ReadOne(entityId)
	require.NoError(t, err)
	require.Equal(t, entity, readEntity)

	anotherEntityId := uuid.Must(uuid.NewV4())
	_, err = reader.ReadOne(anotherEntityId)
	require.Error(t, err)

	anotherEntity := &TestEntity{Id: anotherEntityId.String(), Name: "test"}
	createdAnotherEntity, err := writer.CreateOne(anotherEntity)
	require.NoError(t, err)
	require.Equal(t, anotherEntity, createdAnotherEntity)

	nameParams := map[string]interface{}{"name": "test"}
	entities, err := reader.ReadMany(nameParams, data.PageInfo{})
	require.NoError(t, err)
	require.Len(t, entities, 2)

	entities, err = reader.ReadMany(nameParams, data.PageInfo{PageSize: 1, PageOffset: 1})
	require.NoError(t, err)
	require.Len(t, entities, 1)
	require.Equal(t, anotherEntity, entities[0])
}
