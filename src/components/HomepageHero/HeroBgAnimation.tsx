import React from "react";
import Lottie from "lottie-react";
import styles from "./styles.module.scss";
import { useIsMobile } from "@site/src/utils/isMobile";

import * as heroBgDesktop from "./heroBgDesktop.json";
import * as heroBgMobile from "./heroBgMobile.json";

export default function HeroBg(): JSX.Element {
  const isMobile = useIsMobile();
  const [loadAnimation, setLoadAnimation] = React.useState<boolean>(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoadAnimation(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const lottieRef = React.useRef();

  if (!loadAnimation) return null;

  return isMobile ? (
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
  );
}
