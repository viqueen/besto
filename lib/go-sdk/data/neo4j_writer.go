package data

import neo4jclient "github.com/viqueen/besto/lib/go-sdk/neo4j-client"

type EntityWriteCtx struct {
	matches *neo4jclient.Node
	creates *neo4jclient.Node
	relates *neo4jclient.Relationship
}

type EntityNode struct {
	node         neo4jclient.Node
	relationship *neo4jclient.Relationship
}

func NewEntityNode(node neo4jclient.Node, relationship *neo4jclient.Relationship) EntityNode {
	return EntityNode{
		node:         node,
		relationship: relationship,
	}
}

// EntityNeo4jWriter is a concrete implementation of the EntityWriter interface for Neo4j.
type EntityNeo4jWriter[ENTITY interface{}] struct {
	EntityWriter[ENTITY]
	client *neo4jclient.Neo4jClient

	entityName     string
	entityFields   []string
	entityWriteCtx func(entity *ENTITY) EntityWriteCtx
}

// NewEntityNeo4jWriter creates a new instance of EntityNeo4jWriter.
func NewEntityNeo4jWriter[ENTITY interface{}](
	client *neo4jclient.Neo4jClient,
	entityName string,
	entityFields []string,
	entityWriteCtx func(entity *ENTITY) EntityWriteCtx,
) *EntityNeo4jWriter[ENTITY] {
	return &EntityNeo4jWriter[ENTITY]{
		client:         client,
		entityName:     entityName,
		entityFields:   entityFields,
		entityWriteCtx: entityWriteCtx,
	}
}

// CreateOne creates a single entity in Neo4j.
func (w *EntityNeo4jWriter[ENTITY]) CreateOne(entity *ENTITY) (*ENTITY, error) {
	writeCtx := w.entityWriteCtx(entity)
	qb := neo4jclient.NewQueryBuilder()

	if writeCtx.matches != nil {
		qb = qb.MatchNode("m", *writeCtx.matches)
	}

	if writeCtx.creates != nil {
		qb = qb.CreateNode("c", *writeCtx.creates)
	}

	if writeCtx.relates != nil {
		qb = qb.CreateRelationship(*writeCtx.relates)
	}

	targets := []string{"c"}
	if writeCtx.matches != nil {
		targets = append(targets, "m")
	}

	qb = qb.Return(targets...)

	err := w.client.ExecuteWriteQuery(qb.BuildQuery())

	if err != nil {
		return nil, err
	}

	return entity, nil
}
