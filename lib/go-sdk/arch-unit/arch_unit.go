package arch_unit

import (
	"errors"
	"fmt"
	"golang.org/x/tools/go/packages"
	"strings"
)

type Rule interface {
	Check() error
}

type VisitPkg struct {
	pkg *packages.Package
}

func (v VisitPkg) DoesNotImport(importPathSuffixes ...string) error {
	var errorBuffer []error
	for importPath := range v.pkg.Imports {
		for _, suffix := range importPathSuffixes {
			if strings.HasSuffix(importPath, suffix) {
				errorBuffer = append(errorBuffer, fmt.Errorf("package %s should not import %s", v.pkg.ID, importPath))
			}
		}
	}
	if len(errorBuffer) > 0 {
		return errors.Join(errorBuffer...)
	}
	return nil
}
