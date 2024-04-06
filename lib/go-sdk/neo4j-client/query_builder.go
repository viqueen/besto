package neo4j_client

import (
	"fmt"
	"github.com/gofrs/uuid"
	"github.com/viqueen/besto/lib/go-sdk/slices"
	"golang.org/x/exp/maps"
	"strings"
)

type Node struct {
	Id     uuid.UUID
	Labels []string
	Props  map[string]interface{}
}

type Relationship struct {
	Name     string
	Props    map[string]interface{}
	Target   string
	TargetID uuid.UUID
}

type Query struct {
	Statement string
	Params    map[string]interface{}
}

type QueryBuilder interface {
	CreateNode(node Node) QueryBuilder
	WithRelationship(relationship Relationship) QueryBuilder
	BuildQuery() Query
}

type queryBuilder struct {
	createStatement   string
	relationStatement string
	params            map[string]interface{}
}

func NewQueryBuilder() QueryBuilder {
	return queryBuilder{
		params: make(map[string]interface{}),
	}
}

func (q queryBuilder) CreateNode(node Node) QueryBuilder {
	labels := strings.Join(node.Labels, ":")
	fieldNames := maps.Keys(node.Props)
	fields := slices.Map(fieldNames, func(field string) string {
		return fmt.Sprintf("n.%s", field)
	})
	joinedFields := strings.Join(fields, ", ")
	q.params["Id"] = node.Id.String()
	q.createStatement = fmt.Sprintf("CREATE (n:%s {Id: $Id, %s})", labels, joinedFields)
	return q
}

func (q queryBuilder) WithRelationship(relationship Relationship) QueryBuilder {
	fieldNames := maps.Keys(relationship.Props)
	fields := slices.Map(fieldNames, func(field string) string {
		return fmt.Sprintf("r.%s", field)
	})
	joinedFields := strings.Join(fields, ", ")
	q.relationStatement = fmt.Sprintf("-[r:%s {%s}]->(target:%s {Id: $targetID})", relationship.Name, joinedFields, relationship.Target)
	q.params["targetID"] = relationship.TargetID.String()
	return q
}

func (q queryBuilder) BuildQuery() Query {
	return Query{
		Statement: fmt.Sprintf("%s%s", q.createStatement, q.relationStatement),
		Params:    q.params,
	}
}
