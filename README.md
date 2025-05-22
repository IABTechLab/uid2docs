# UID2 Documentation

> Note: The new location for viewing UID2 documentation content is on the Unified ID website: [Unified ID 2.0 Overview](https://unifiedid.com/docs/intro).

This repository contains all the content files and supporting site infrastructure for the [Unified ID 2.0 website](https://unifiedid.com). Site content is available in the following languages:

- English (US)
- Japanese

For information about build tools and about contributing to this repository, see [CONTRIBUTING.md](CONTRIBUTING.md).

## Adding custom tags

1. Add imports to top of markdown file body

```ts
import CustomTagsFilters from "@site/src/components/CustomTags/CustomTagsFilters";
import CustomTagsContainer from "@site/src/components/CustomTags/CustomTagsContainer";
```

2. Render `CustomTagsFilters` in desired location - probably at top of page below heading.

```tsx
<CustomTagsFilters />
```

3. Wrap tagged section with CustomTagsContainer and add desired tags, comma-separated

```mdx
<CustomTagsContainer tags="tag one, tag two">

### My Tagged Section

The body of my tagged section. <a href="">An example link.</a>

</CustomTagsContainer>
```

4. All added tags should now appear as clickable tag buttons at the top of the page. Clicking a tag will filter only results that match that tag. Clicking the tag again should toggle all content to be visible.
