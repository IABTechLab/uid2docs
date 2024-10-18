import React from "react";
import clsx from "clsx";
import { useBlogPost } from "@docusaurus/plugin-content-blog/client";
import BlogPostItemContainer from "@theme/BlogPostItem/Container";
import BlogPostItemHeader from "@theme/BlogPostItem/Header";
import BlogPostItemContent from "@theme/BlogPostItem/Content";
import BlogPostItemFooter from "@theme/BlogPostItem/Footer";
import type { Props } from "@theme/BlogPostItem";
import { pushGtmEvent } from "@site/src/utils/pushGtmEvent";

// apply a bottom margin in list view
function useContainerClassName() {
  const { isBlogPostPage } = useBlogPost();
  return !isBlogPostPage ? "margin-bottom--xl" : undefined;
}

export default function BlogPostItem({
  children,
  className,
}: Props): JSX.Element {
  const containerClassName = useContainerClassName();
  const {
    isBlogPostPage,
    metadata: { authors, tags },
  } = useBlogPost();

  const authorNames = authors
    ? authors.map((author) => author.name).join(", ")
    : undefined;

  const tagNames = tags ? tags.map((tag) => tag.label).join(", ") : undefined;

  React.useEffect(() => {
    const pageViewData = {
      event: "Initialize_dataLayer",
      document_type: "Blog",
      document_title: document.title,
      article_author: authorNames,
      tags: tagNames,
    };
    if (isBlogPostPage) {
      pushGtmEvent(pageViewData);
    }
  }, [isBlogPostPage]);
  return (
    <BlogPostItemContainer className={clsx(containerClassName, className)}>
      <BlogPostItemHeader />
      <BlogPostItemContent>{children}</BlogPostItemContent>
      <BlogPostItemFooter />
    </BlogPostItemContainer>
  );
}
