package arch_unit

import (
	"errors"
	"github.com/viqueen/besto/lib/go-sdk/slices"
	"golang.org/x/tools/go/packages"
	"strings"
)

type AppServerRule struct{}

func (r *AppServerRule) Check() error {
	cfg := &packages.Config{Mode: packages.NeedImports}
	pkgs, err := packages.Load(cfg, "./...")
	if err != nil {
		return err
	}

	pkgVisitors := slices.Map(pkgs, func(pkg *packages.Package) VisitPkg {
		return VisitPkg{
			pkg: pkg,
		}
	})

	var errorBuffer []error
	for _, pkgVisitor := range pkgVisitors {
		if strings.HasSuffix(pkgVisitor.pkg.ID, "internal/data") {
			checkErr := pkgVisitor.DoesNotImport("internal/service", "export", "cmd")
			errorBuffer = append(errorBuffer, checkErr)
		} else if strings.HasSuffix(pkgVisitor.pkg.ID, "internal/service") {
			checkErr := pkgVisitor.DoesNotImport("export", "cmd")
			errorBuffer = append(errorBuffer, checkErr)
		} else if strings.HasSuffix(pkgVisitor.pkg.ID, "export") {
			checkErr := pkgVisitor.DoesNotImport("cmd")
			errorBuffer = append(errorBuffer, checkErr)
		}
	}

	errorBuffer = slices.Filter(errorBuffer, func(err error) bool {
		return err != nil
	})

	if len(errorBuffer) > 0 {
		return errors.Join(errorBuffer...)
	}

	return nil
}
