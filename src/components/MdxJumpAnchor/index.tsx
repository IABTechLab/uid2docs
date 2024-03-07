/* eslint-disable @typescript-eslint/no-var-requires */
import React from "react";
import useBrokenLinks from "@docusaurus/useBrokenLinks";

/*** Custom component created for JumpAnchors to pass brokenlinks checker in Docusaurus
 * https://docusaurus.io/blog/releases/3.1#broken-anchors-checker
 * https://docusaurus.io/docs/docusaurus-core#useBrokenLinks
 */

type MdxJumpAnchorProps = {
  children: React.ReactNode;
  id?: string;
};

export default function MdxJumpAnchor({
  id,
  children,
}: MdxJumpAnchorProps): JSX.Element {
  useBrokenLinks().collectAnchor(id);
  return (
    <span id={id} className="jump-anchor">
      {children}
    </span>
  );
}
