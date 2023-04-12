import React from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

export type SectionHeaderProps = {
  heading: string;
  subheading: string;
  eyebrow?: string;
  extraClass?: string;
};
export default function SectionHeader({
  heading,
  subheading,
  eyebrow,
  extraClass,
}: SectionHeaderProps): JSX.Element {
  return (
    <header
      className={clsx([
        "row",
        styles.sectionHeader,
        extraClass ? extraClass : null,
      ])}
    >
      {eyebrow && (
        <p className={clsx("type-zeta col col--8 eyebrow", styles.eyebrow)}>
          {eyebrow}
        </p>
      )}
      <h2 className={clsx("type-beta col col--8")}>{heading}</h2>
      <p className={clsx("type-paragraph-large col col--4", styles.copy)}>
        {subheading}
      </p>
    </header>
  );
}
