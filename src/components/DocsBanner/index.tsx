import React, { CSSProperties, ComponentType, SVGProps } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";
import DocumentsSvg from "@site/static/img/documents-icon.svg";

const icons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  documents: DocumentsSvg,
};

type DocsBannerProps = {
  title: string;
  description: string;
  icon?: string;
  backgroundColor?: string;
  backgroundColorDark?: string;
};

export default function DocsBanner({
  title,
  description,
  icon,
  backgroundColor,
  backgroundColorDark,
}: DocsBannerProps): JSX.Element {
  const Icon = (icon && icons[icon]) || icons.documents;

  backgroundColor ||= "var(--c-dirty-socks)"; // default banner bg color
  backgroundColorDark ||= "var(--c-primary-gray)"; // default banner bg color dark theme

  //remove the dulpicate html <header> + h1 tags within the .markdown
  React.useEffect(() => {
    const header = document.querySelector(".markdown > header");
    if (header) header.remove();
  }, []);

  return (
    <header
      className={clsx(styles.docsBanner)}
      style={
        {
          "--bg-docs-banner": backgroundColor,
          "--bg-docs-banner-dark": backgroundColorDark,
        } as CSSProperties
      }
    >
      <div className={styles.docsBannerLeft}>
        <h1 className="type-gamma">{title}</h1>
        <p className="type-paragraph">{description}</p>
      </div>

      <Icon className={styles.icon} />
    </header>
  );
}
