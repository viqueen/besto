package neo4j_client

import (
	"fmt"
	"github.com/viqueen/besto/lib/go-sdk/slices"
	"golang.org/x/exp/maps"
	"strings"
)

type QueryBuilder interface {
	MatchNode(target string, node Node) QueryBuilder
	MatchRelationship(fromTarget string, relation Relationship, toTarget string) QueryBuilder
	CreateNode(target string, node Node) QueryBuilder
	CreateRelationship(fromTarget string, relationship Relationship, toTarget string) QueryBuilder
	Return(targets ...string) QueryBuilder
	WithPagination(pagination Pagination) QueryBuilder
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
	var fieldNames []string

	if !node.Id.IsNil() {
		fieldNames = append(fieldNames, fmt.Sprintf("id: $%s_id", target))
		q.params[fmt.Sprintf("%s_id")] = node.Id.String()
	}

	for key, value := range node.Props {
		fieldNames = append(fieldNames, fmt.Sprintf("%s: $%s_%s", key, target, key))
		q.params[fmt.Sprintf("%s_%s", target, key)] = value
	}

	filter := strings.Join(fieldNames, ", ")
	q.statement += fmt.Sprintf("MATCH (%s:%s {%s})\n", target, labels, filter)
	return q
}

func (q queryBuilder) MatchRelationship(fromTarget string, relation Relationship, toTarget string) QueryBuilder {
	fieldNames := maps.Keys(relation.Props)
	fields := slices.Map(fieldNames, func(field string) string {
		return fmt.Sprintf("r.%s", field)
	})
	joinedFields := strings.Join(fields, ", ")
	q.statement += fmt.Sprintf("MATCH (%s)-[r:%s {%s}]->(%s)\n", fromTarget, relation.Name, joinedFields, toTarget)
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

func (q queryBuilder) CreateRelationship(from string, relationship Relationship, to string) QueryBuilder {
	fieldNames := maps.Keys(relationship.Props)
	fields := slices.Map(fieldNames, func(field string) string {
		return fmt.Sprintf("r.%s", field)
	})
	joinedFields := strings.Join(fields, ", ")
	q.statement += fmt.Sprintf("(%s)-[r:%s {%s}]->(%s)\n", from, relationship.Name, joinedFields, to)
	return q
}

func (q queryBuilder) Return(targets ...string) QueryBuilder {
	q.statement += fmt.Sprintf("RETURN %s\n", strings.Join(targets, ", "))
	return q
}

func (q queryBuilder) WithPagination(pagination Pagination) QueryBuilder {
	if pagination.Offset == 0 && pagination.Limit == 0 {
		return q
	}
	if pagination.Offset == 0 {
		q.statement += fmt.Sprintf("LIMIT %d\n", pagination.Limit)
		return q
	}
	if pagination.Limit == 0 {
		q.statement += fmt.Sprintf("SKIP %d\n", pagination.Offset)
		return q
	}
	q.statement += fmt.Sprintf("SKIP %d LIMIT %d\n", pagination.Offset, pagination.Limit)
	return q
}

func (q queryBuilder) BuildQuery() Query {
	return Query{
		Statement: q.statement,
		Params:    q.params,
	}
}