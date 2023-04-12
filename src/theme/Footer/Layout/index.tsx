import React from "react";
import clsx from "clsx";
import type { Props } from "@theme/Footer/Layout";

export default function FooterLayout({
  style,
  links,
  logo,
  copyright,
}: Props): JSX.Element {
  return (
    <footer
      className={clsx("footer", {
        "footer--dark": style === "dark",
      })}
    >
      <div className="container container-fluid">
        <div className="row">
          <div className="col col--4">
            {logo}
            {copyright}
          </div>
          <div className="col col--8 text-right">{links}</div>
        </div>
      </div>
    </footer>
  );
}
