package server_test

import (
	"github.com/stretchr/testify/assert"
	archunit "github.com/viqueen/besto/lib/go-sdk/arch-unit"
	"testing"
)

func TestPlatformAppServer(t *testing.T) {
	appServerRule := archunit.AppServerRule{}
	err := appServerRule.Check()
	assert.NoError(t, err)
}
