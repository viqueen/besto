package data

import neo4jclient "github.com/viqueen/besto/lib/go-sdk/neo4j-client"

type EntityWriteCtx struct {
	Matches                *neo4jclient.Node
	Creates                *neo4jclient.Node
	RelateCreatedToMatched *neo4jclient.Relationship
	RelateMatchedToCreated *neo4jclient.Relationship
}

// EntityNeo4jWriter is a concrete implementation of the EntityWriter interface for Neo4j.
type EntityNeo4jWriter[ENTITY interface{}] struct {
	EntityWriter[ENTITY]
	client *neo4jclient.Neo4jClient

	entityName     string
	entityFields   []string
	entityWriteCtx func(entity *ENTITY) EntityWriteCtx
}

// NewEntityNeo4jWriter Creates a new instance of EntityNeo4jWriter.
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

// CreateOne Creates a single entity in Neo4j.
func (w *EntityNeo4jWriter[ENTITY]) CreateOne(entity *ENTITY) (*ENTITY, error) {
	writeCtx := w.entityWriteCtx(entity)
	qb := neo4jclient.NewQueryBuilder()

	if writeCtx.Creates != nil {
		qb = qb.CreateNode("c", *writeCtx.Creates)
		qb = qb.WithTargets("c")
	}

	if writeCtx.Matches != nil {
		qb = qb.MatchNode("m", *writeCtx.Matches)
		qb = qb.WithTargets("m")
	}

	if writeCtx.Matches != nil && writeCtx.RelateCreatedToMatched != nil {
		qb = qb.CreateRelationship("c", *writeCtx.RelateCreatedToMatched, "m")
	} else if writeCtx.Matches != nil && writeCtx.RelateMatchedToCreated != nil {
		qb = qb.CreateRelationship("m", *writeCtx.RelateMatchedToCreated, "c")
	}

	targets := []string{"c"}
	if writeCtx.Matches != nil {
		targets = append(targets, "m")
	}

	qb = qb.Return(targets...)

	_, err := w.client.ExecuteWriteQuery(qb.BuildQuery())

	if err != nil {
		return nil, err
	}

	return entity, nil
}
