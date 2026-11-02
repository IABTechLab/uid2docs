# Ignore all findings for these npm packages. Not vulnerable.
# See: UID2-8233, UID2-8234, UID2-8235, UID2-8236, UID2-8237, UID2-8238
package trivy

import rego.v1

default ignore := false

ignored_packages := {"joi", "node-forge"}

ignore if {
	input.PkgName in ignored_packages
	startswith(input.PkgIdentifier.PURL, "pkg:npm/")
}
