import React from "react";
import clsx from "clsx";
import Translate from "@docusaurus/Translate";
import type { Props } from "@theme/NotFound/Content";
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";

export default function NotFoundContent({ className }: Props): JSX.Element {
  return (
    <main className={clsx("container margin-vert--xl", className)}>
      <div className="row">
        <div className="col col--6 col--offset-3">
          <Heading as="h1" className="hero__title">
            <Translate
              id="theme.NotFound.title"
              description="The title of the 404 page"
            >
              Page Not Found
            </Translate>
          </Heading>
          <p>
            <Translate
              id="theme.NotFound.p1"
              description="The first paragraph of the 404 page"
            >
              We couldn't find the page you were looking for. The page might
              have been moved, or there was an error in the link.
            </Translate>
          </p>
          <p>
            <Translate
              id="theme.NotFound.p2"
              description="The 2nd paragraph of the 404 page"
            >
              Here are some things you can do:
            </Translate>
          </p>
          <ul>
            <li>
              <Translate
                id="theme.NotFound.ListItem1"
                description="The first list item of the 404 page"
              >
                Go back and retry the link.
              </Translate>
            </li>
            <li>
              <Translate
                id="theme.NotFound.ListItem2"
                description="The second list item of the 404 page"
              >
                Search for the document by its title or keywords from any UID2
                page.
              </Translate>
            </li>
            <li>
              <Link to="/docs/intro">
                <Translate
                  id="theme.NotFound.ListItem3"
                  description="The third list item of the 404 page"
                >
                  Visit the UID2 documentation home page.
                </Translate>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
