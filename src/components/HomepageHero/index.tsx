import React from "react";
import clsx from "clsx";
import Lottie from "lottie-react";
import styles from "./styles.module.scss";
import { useIsMobile } from "@site/src/utils/isMobile";

// @ts-ignore - Lottie animation data
import * as heroBgDesktop from "./heroBgDesktop.json";
// @ts-ignore - Lottie animation data
import * as heroBgMobile from "./heroBgMobile.json";

export default function HomepageHero(): JSX.Element {
  const isMobile = useIsMobile();

  const lottieRef = React.useRef();
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
              An open-source identity solution built for the open internet
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col col--6">
            <p className={clsx("type-paragraph-large")}>
              Unified ID 2.0 leverages encrypted email and phone number data to
              provide a privacy-conscious, secure, and accurate identity
              standard for the entire digital advertising ecosystem.
            </p>
          </div>
        </div>
      </div>

      {isMobile ? (
        <Lottie
          lottieRef={lottieRef}
          animationData={heroBgMobile}
          loop={true}
          className={styles.heroBgAnimationMobile}
        />
      ) : (
        <Lottie
          lottieRef={lottieRef}
          animationData={heroBgDesktop}
          loop={true}
          className={styles.heroBgAnimationDesktop}
        />
      )}
    </header>
  );
}
