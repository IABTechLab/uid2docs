import React, { CSSProperties, ComponentType, SVGProps } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";
import IconDocuments from "@site/static/img/documents-icon.svg";
import IconAdvertisers from "@site/static/img/icon-page-advertisers.svg";
import IconDataProviders from "@site/static/img/icon-page-dataproviders.svg";
import IconDsps from "@site/static/img/icon-page-dsps.svg";
import IconPublishers from "@site/static/img/icon-page-publishers.svg";

const icons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  documents: IconDocuments,
  advertisers: IconAdvertisers,
  dataProviders: IconDataProviders,
  dsps: IconDsps,
  publishers: IconPublishers,
};

type DocsBannerProps = {
  title: string;
  description: string;
  icon?: string;
  textColor?: string;
  textColorDark?: string;
  backgroundColor?: string;
  backgroundColorDark?: string;
};

export default function DocsBanner({
  title,
  description,
  icon,
  textColor,
  textColorDark,
  backgroundColor,
  backgroundColorDark,
}: DocsBannerProps): JSX.Element {
  const Icon = (icon && icons[icon]) || icons.documents;

  textColor ||= "var(--c-eleven-o-clock)"; // default banner text color
  textColorDark ||= "var(--c-off-white)"; // default banner text color dark theme

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
          "--text-docs-banner": textColor,
          "--text-docs-banner-dark": textColorDark,
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
