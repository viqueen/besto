package data

import "github.com/gofrs/uuid"

// PageInfo represents the pagination information for a query.
type PageInfo struct {
	PageSize   int32
	PageOffset int32
}

// EntityReader defines the interface for reading operations from a data store.
type EntityReader[ENTITY interface{}] interface {
	ReadOne(id uuid.UUID) (*ENTITY, error)
	ReadMany(pageInfo PageInfo) ([]*ENTITY, error)
}

// EntityWriter defines the interface for writing operations to a data store.
type EntityWriter[ENTITY interface{}] interface {
	CreateOne(entity *ENTITY) (*ENTITY, error)
}

// EntityAccess defines the access to an entity in a data store.
type EntityAccess[ENTITY interface{}] struct {
	Reader EntityReader[ENTITY]
	Writer EntityWriter[ENTITY]
}
