import React from "react";
import clsx from "clsx";
import Lottie from "lottie-react";
import Translate, { translate } from "@docusaurus/Translate";
import { usePrefersReducedMotion } from "@site/src/utils/usePrefersReducesMotion";
import styles from "./styles.module.scss";
import SectionHeader from "@site/src/components/SectionHeader";
import * as emailAnimation from "./email.json";
import * as crossDeviceAnimation from "./crossDevice.json";
import * as personLockAnimation from "./personLock.json";

type FeatureItem = {
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
  lottieAnimation?: JSON;
};

const componentData = {
  heading: translate({
    id: "homepage.featuredItemsHeading",
    message: "Enable personalization and relevance on content and advertising",
  }),
  subheading: translate({
    id: "homepage.featuredItemsSubheading",
    message:
      "Unified ID 2.0 offers greater personalization, targeting, measurement, and security for every use case — from advertisers to publishers and everyone in between.",
  }),
};

const FeatureList: FeatureItem[] = [
  {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    Svg: require("@site/static/img/email-feature.svg").default,
    description: (
      <Translate id="homepage.featureItem1Description">
        Use deterministic data for greater precision.
      </Translate>
    ),
    //@ts-ignore
    lottieAnimation: emailAnimation,
  },
  {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    Svg: require("@site/static/img/cross-device.svg").default,
    description: (
      <Translate id="homepage.featureItem2Description">
        Upgrade to an omnichannel and cross-device ID type.
      </Translate>
    ),
    //@ts-ignore
    lottieAnimation: crossDeviceAnimation,
  },
  {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    Svg: require("@site/static/img/person-lock.svg").default,
    description: (
      <Translate id="homepage.featureItem3Description">
        Hash, salt, and transport directly identifying information (DII) as
        pseudonymized IDs.
      </Translate>
    ),
    //@ts-ignore
    lottieAnimation: personLockAnimation,
  },
];

function Feature({ Svg, description, lottieAnimation }: FeatureItem) {
  const prefersReducedMotion = usePrefersReducedMotion();
  return (
    <div className={clsx(styles.card)}>
      {prefersReducedMotion ? (
        <Svg className={styles.featureImage} aria-hidden={true} />
      ) : (
        <Lottie
          animationData={lottieAnimation}
          loop={true}
          className={styles.featureAnimation}
        />
      )}

      <p className="type-paragraph-large">{description}</p>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={clsx("bg-lavender text-white", styles.features)}>
      <div className="container">
        <SectionHeader
          heading={componentData.heading}
          subheading={componentData.subheading}
          extraClass={styles.header}
        />
        <div className={clsx(styles.featuredList)}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
