# uid_shared_ helpers are appended by the shared vulnerability_scan action (UID2-8363).
package trivy

import rego.v1

default ignore := false

# Ignore all findings for these npm packages. Not vulnerable.
# See: UID2-8233, UID2-8234, UID2-8235, UID2-8236, UID2-8237, UID2-8238
ignored_packages := {"joi", "node-forge"}

ignore if {
	input.PkgName in ignored_packages
	startswith(input.PkgIdentifier.PURL, "pkg:npm/")
}

# Ignore npm findings that only affect availability.
# See: UID2-8366
ignore if {
	input.Type == "vulnerability"
	startswith(input.PkgIdentifier.PURL, "pkg:npm/")
	uid_shared_availability_only
}
