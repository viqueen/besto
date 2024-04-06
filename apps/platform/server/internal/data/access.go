package data

import (
	identityV1 "github.com/viqueen/besto/_api/go-sdk/platform/identity/v1"
	libData "github.com/viqueen/besto/lib/go-sdk/data"
)

type IdentityAccess struct {
	Identity        *libData.EntityAccess[identityV1.Identity]
	IdentityProfile *libData.EntityAccess[identityV1.IdentityProfile]
}
