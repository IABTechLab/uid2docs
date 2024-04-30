import React from "react";
import clsx from "clsx";
import Translate from "@docusaurus/Translate";

import HeroDesktopBg from "@site/static/img/hero-desktop.svg";
import HeroMobileBg from "@site/static/img/hero-mobile.svg";
import styles from "./styles.module.scss";
import { useIsJapanese } from "@site/src/utils/isJapanese";
import { useForcedDarkTheme } from "@site/src/utils/useForcedDarkTheme";
export default function HomepageHero(): JSX.Element {
  const isJapanese = useIsJapanese();
  useForcedDarkTheme();

  return (
    <header className={clsx("bg-11-o-clock text-white", styles.homepageHero)}>
      <div
        className={clsx(
          "container",
          styles.homepageHeroContent,
          styles.textShadow,
        )}
      >
        <div className="row">
          <div className={`col ${isJapanese ? "col--12" : "col--10"}`}>
            <h1
              className={`${isJapanese ? styles.heroHeadingJa : "type-alpha"}`}
            >
              <Translate id="homepage.heroTitle">
                An open-source identity solution built for the open internet
              </Translate>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col col--6">
            <p className={clsx("type-paragraph-large")}>
              <Translate id="homepage.heroCopy">
                Unified ID 2.0 leverages encrypted email and phone number data
                to provide a privacy-conscious, secure, and accurate identity
                standard for the entire digital advertising ecosystem.
              </Translate>
            </p>
          </div>
        </div>
      </div>
      <HeroMobileBg className={clsx(styles.heroBg, styles.heroMobileBg)} />
      <HeroDesktopBg className={clsx(styles.heroBg, styles.heroDesktopBg)} />
    </header>
  );
}
