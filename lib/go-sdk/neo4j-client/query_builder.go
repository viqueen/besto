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
	WithTargets(target ...string) QueryBuilder
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
	// MATCH (c:IdentityProfile:GITHUB { id: $c_id, provider: $c_provider, profile: $c_profile })
	statement, params := nodeQuery(target, node)
	q.statement += fmt.Sprintf("MATCH %s\n", statement)
	for key, value := range params {
		q.params[key] = value
	}
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
	// CREATE (c:IdentityProfile:GITHUB { id: $c_id, provider: $c_provider, profile: $c_profile })
	statement, params := nodeQuery(target, node)
	q.statement += fmt.Sprintf("CREATE %s\n", statement)
	for key, value := range params {
		q.params[key] = value
	}
	return q
}

func nodeQuery(target string, node Node) (string, map[string]interface{}) {
	var params = make(map[string]interface{})
	var fieldNames []string

	if !node.Id.IsNil() {
		fieldNames = append(fieldNames, fmt.Sprintf("id: $%s_id", target))
		params[fmt.Sprintf("%s_id", target)] = node.Id.String()
	}

	for key, value := range node.Props {
		fieldNames = append(fieldNames, fmt.Sprintf("%s: $%s_%s", key, target, key))
		params[fmt.Sprintf("%s_%s", target, key)] = value
	}

	labels := strings.Join(node.Labels, ":")
	filter := strings.Join(fieldNames, ", ")
	return fmt.Sprintf("(%s:%s {%s})", target, labels, filter), params
}

func (q queryBuilder) CreateRelationship(from string, relationship Relationship, to string) QueryBuilder {
	var fieldNames []string
	for key, value := range relationship.Props {
		fieldNames = append(fieldNames, fmt.Sprintf("%s: $r_%s", key, key))
		q.params[fmt.Sprintf("r_%s", key)] = value
	}
	joinedFields := strings.Join(fieldNames, ", ")
	q.statement += fmt.Sprintf("CREATE (%s)-[r:%s {%s}]->(%s)\n", from, relationship.Name, joinedFields, to)
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

func (q queryBuilder) WithTargets(targets ...string) QueryBuilder {
	q.statement += fmt.Sprintf("WITH %s\n", strings.Join(targets, ", "))
	return q
}

func (q queryBuilder) BuildQuery() Query {
	return Query{
		Statement: q.statement,
		Params:    q.params,
	}
}
