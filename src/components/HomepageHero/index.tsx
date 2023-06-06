import React from "react";
import clsx from "clsx";
import Translate from "@docusaurus/Translate";
import HeroBg from "./HeroBgAnimation";
import styles from "./styles.module.scss";

export default function HomepageHero(): JSX.Element {
  return (
    <header className={clsx("bg-11-o-clock text-white", styles.homepageHero)}>
      <div
        className={clsx(
          "container",
          styles.homepageHeroContent,
          styles.textShadow
        )}
      >
        <div className="row">
          <div className="col col--10">
            <h1 className={clsx("type-alpha")}>
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
      <HeroBg />
    </header>
  );
}
