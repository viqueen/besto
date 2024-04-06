package neo4j_client

import (
	"fmt"
	"github.com/viqueen/besto/lib/go-sdk/slices"
	"golang.org/x/exp/maps"
	"strings"
)

type QueryBuilder interface {
	MatchNode(target string, node Node) QueryBuilder
	CreateNode(target string, node Node) QueryBuilder
	CreateRelationship(relationship Relationship) QueryBuilder
	Return(targets ...string) QueryBuilder
	BuildQuery() Query
}

type queryBuilder struct {
	statement string
	params    map[string]interface{}
}

func NewQueryBuilder() QueryBuilder {
	return queryBuilder{
		statement: "",
		params:    make(map[string]interface{}),
	}
}

func (q queryBuilder) MatchNode(target string, node Node) QueryBuilder {
	labels := strings.Join(node.Labels, ":")
	q.statement += fmt.Sprintf("MATCH (%s:%s {id: $%s_id})\n", target, labels, target)
	q.params[fmt.Sprintf("%s_id", target)] = node.Id.String()
	return q
}

func (q queryBuilder) CreateNode(target string, node Node) QueryBuilder {
	labels := strings.Join(node.Labels, ":")
	fieldNames := maps.Keys(node.Props)
	fields := slices.Map(fieldNames, func(field string) string {
		return fmt.Sprintf("%s.%s", target, field)
	})
	joinedFields := strings.Join(fields, ", ")
	if joinedFields != "" {
		joinedFields = fmt.Sprintf(", %s", joinedFields)
	}
	q.statement += fmt.Sprintf("CREATE (%s:%s { id: $%s_id %s})\n", target, labels, target, joinedFields)
	q.params[fmt.Sprintf("%s_id", target)] = node.Id.String()
	return q
}

func (q queryBuilder) CreateRelationship(relationship Relationship) QueryBuilder {
	fieldNames := maps.Keys(relationship.Props)
	fields := slices.Map(fieldNames, func(field string) string {
		return fmt.Sprintf("r.%s", field)
	})
	joinedFields := strings.Join(fields, ", ")
	q.statement += fmt.Sprintf("(%s)-[r:%s {%s}]->(%s)\n", relationship.From, relationship.Name, joinedFields, relationship.To)
	return q
}

func (q queryBuilder) Return(targets ...string) QueryBuilder {
	q.statement += fmt.Sprintf("RETURN %s\n", strings.Join(targets, ", "))
	return q
}

func (q queryBuilder) BuildQuery() Query {
	return Query{
		Statement: q.statement,
		Params:    q.params,
	}
}
