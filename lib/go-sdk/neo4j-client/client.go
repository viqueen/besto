package neo4j_client

import (
	"github.com/gofrs/uuid"
	"github.com/neo4j/neo4j-go-driver/neo4j"
)

type Pagination struct {
	Offset int32
	Limit  int32
}

type Node struct {
	Id     uuid.UUID
	Labels []string
	Props  map[string]interface{}
}

type Relationship struct {
	Name  string
	Props map[string]interface{}
}

type Query struct {
	Statement string
	Params    map[string]interface{}
}

// Neo4jReader defines the interface for reading operations from Neo4j.
type Neo4jReader interface {
	ExecuteReadQuery(query string, params map[string]interface{}) (neo4j.Result, error)
}

// Neo4jWriter defines the interface for writing operations to Neo4j.
type Neo4jWriter interface {
	ExecuteWriteQuery(query Query) (neo4j.Result, error)
}

// Neo4jClient is a client for interacting with Neo4j.
type Neo4jClient struct {
	dbName string
	driver neo4j.Driver
}

// NewTestNeo4jClient creates a new instance of Neo4jClient for a test Neo4j instance.
func NewTestNeo4jClient() (*Neo4jClient, error) {
	return NewNeo4jClient("bolt://localhost:8687", "neo4j", "test-password", "")
}

// NewNeo4jClient creates a new instance of Neo4jClient.
func NewNeo4jClient(uri, username, password, dbName string) (*Neo4jClient, error) {
	driver, err := neo4j.NewDriver(uri, neo4j.BasicAuth(username, password, ""), func(c *neo4j.Config) {
		c.Encrypted = false
	})
	if err != nil {
		return nil, err
	}
	return &Neo4jClient{
		dbName: dbName,
		driver: driver,
	}, nil
}

// ExecuteReadQuery executes a read query against Neo4j.
func (n *Neo4jClient) ExecuteReadQuery(query Query) (neo4j.Result, error) {
	session, _ := n.driver.NewSession(neo4j.SessionConfig{
		AccessMode:   neo4j.AccessModeRead,
		DatabaseName: n.dbName,
	})
	defer session.Close()

	result, err := session.ReadTransaction(func(transaction neo4j.Transaction) (interface{}, error) {
		return transaction.Run(query.Statement, query.Params)
	})

	if err != nil {
		return nil, err
	}

	return result.(neo4j.Result), nil
}

// ExecuteWriteQuery executes a write query against Neo4j.
func (n *Neo4jClient) ExecuteWriteQuery(query Query) (neo4j.Result, error) {
	session, _ := n.driver.NewSession(neo4j.SessionConfig{
		AccessMode:   neo4j.AccessModeWrite,
		DatabaseName: n.dbName,
	})
	defer session.Close()

	result, err := session.WriteTransaction(func(transaction neo4j.Transaction) (interface{}, error) {
		return transaction.Run(query.Statement, query.Params)
	})

	if err != nil {
		return nil, err
	}

	return result.(neo4j.Result), nil
}
