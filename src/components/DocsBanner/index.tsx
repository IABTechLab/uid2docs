import React from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";
import DocumentsSvg from "@site/static/img/documents-icon.svg";

type DocsBannerProps = {
  title: string;
  description: string;
};

export default function DocsBanner({
  title,
  description,
}: DocsBannerProps): JSX.Element {
  //remove the dulpicate html <header> + h1 tags within the .markdown
  React.useEffect(() => {
    const header = document.querySelector(".markdown > header");
    if (header) {
      header.remove();
    }
  }, []);

  return (
    <header className={clsx(styles.docsBanner)}>
      <div className={styles.docsBannerLeft}>
        <h1 className="type-gamma">{title}</h1>
        <p className="type-paragraph">{description}</p>
      </div>
      <DocumentsSvg className={styles.icon} />
    </header>
  );
}
