/* eslint-disable @typescript-eslint/no-var-requires */
import React from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

type PageHeaderProps = {
  heading: string;
  subheading: string;
};

export default function PageHeader({
  heading,
  subheading,
}: PageHeaderProps): JSX.Element {
  return (
    <header className={clsx("bg-11-o-clock text-white", styles.pageHeader)}>
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <h1 className="type-alpha">{heading}</h1>
            <p className="type-paragraph-large">{subheading}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
