import React from "react";
import type { Props } from "@theme/Footer/Copyright";

export default function FooterCopyright({ copyright }: Props): JSX.Element {
  return <p className="footer__copyright text-paragraph-small">{copyright}</p>;
}
