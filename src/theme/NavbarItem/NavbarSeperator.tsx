/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React from "react";
import { clsx } from "clsx";

export default function NavbarSeparator({ classNames, ...props }) {
  return <div {...props} className={clsx(classNames, "separator")} />;
}
