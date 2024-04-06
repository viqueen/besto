package neo4j_client

import (
	"fmt"
	"github.com/viqueen/besto/lib/go-sdk/slices"
	"golang.org/x/exp/maps"
	"strings"
)

type WriteQueryBuilder interface {
	CreateNode(node Node) WriteQueryBuilder
	WithRelationship(relationship Relationship) WriteQueryBuilder
	BuildQuery() Query
}

type writeQueryBuilder struct {
	createStatement   string
	relationStatement string
	params            map[string]interface{}
}

func NewWriteQueryBuilder() WriteQueryBuilder {
	return writeQueryBuilder{
		params: make(map[string]interface{}),
	}
}

func (q writeQueryBuilder) CreateNode(node Node) WriteQueryBuilder {
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

func (q writeQueryBuilder) WithRelationship(relationship Relationship) WriteQueryBuilder {
	fieldNames := maps.Keys(relationship.Props)
	fields := slices.Map(fieldNames, func(field string) string {
		return fmt.Sprintf("r.%s", field)
	})
	joinedFields := strings.Join(fields, ", ")
	q.relationStatement = fmt.Sprintf("-[r:%s {%s}]->(target:%s {id: $targetID})", relationship.Name, joinedFields, relationship.Target)
	q.params["targetID"] = relationship.TargetID.String()
	return q
}

func (q writeQueryBuilder) BuildQuery() Query {
	return Query{
		Statement: fmt.Sprintf("%s%s", q.createStatement, q.relationStatement),
		Params:    q.params,
	}
}
