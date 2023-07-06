import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { pushGtmEvent } from "@site/src/utils/pushGtmEvent";

type NavbarCtaProps = {
  text: string;
  href: string;
  className?: string;
};

export default function NavbarCta({
  text,
  href,
  className,
  ...props
}: NavbarCtaProps) {
  const pageViewData = {
    event: "button_click",
    click_item: "primary nav button",
    click_text: text,
    link_url: href,
  };
  return (
    <Link
      {...props}
      href={href}
      className={clsx(className, "button button--nav")}
      onClick={() => pushGtmEvent(pageViewData)}
    >
      {text}
    </Link>
  );
}
