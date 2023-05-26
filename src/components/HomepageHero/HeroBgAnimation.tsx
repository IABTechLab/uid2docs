import React from "react";
import Lottie from "lottie-react";
import styles from "./styles.module.scss";
import { useIsMobile } from "@site/src/utils/isMobile";

import * as heroBgDesktop from "./heroBgDesktop.json";
import * as heroBgMobile from "./heroBgMobile.json";

export default function HeroBg(): JSX.Element {
  const isMobile = useIsMobile();
  const [animationData, setAnimationData] = React.useState<any>(null);

  React.useEffect(() => {
    return isMobile
      ? setAnimationData(heroBgMobile)
      : setAnimationData(heroBgDesktop);
  }, [isMobile]);

  const lottieRef = React.useRef();

  if (!animationData) return null;
  return isMobile ? (
    <Lottie
      lottieRef={lottieRef}
      animationData={animationData}
      loop={true}
      className={styles.heroBgAnimationMobile}
    />
  ) : (
    <Lottie
      lottieRef={lottieRef}
      animationData={animationData}
      loop={true}
      className={styles.heroBgAnimationDesktop}
    />
  );
}
