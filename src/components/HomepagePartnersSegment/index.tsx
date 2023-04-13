/* eslint-disable @typescript-eslint/no-var-requires */
import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import styles from "./styles.module.scss";
import RightArrow from "@site/static/img/right-arrow-icon.svg";
import SectionHeader from "@site/src/components/SectionHeader";
import { useIsMobile } from "@site/src/utils/isMobile";
import { usePrefersReducedMotion } from "@site/src/utils/usePrefersReducesMotion";

// @ts-ignore - Lottie animation data
import chartIconAnimation from "./chartIconData.json";
// @ts-ignore - Lottie animation data
import documentsAnimation from "./documentsIconData.json";
// @ts-ignore - Lottie animation data
import flowchartAnimation from "./flowchartIconData.json";
// @ts-ignore - Lottie animation data
import uploadAnimation from "./uploadIconData.json";

type PartnerItem = {
  heading: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  animationData: JSON;
  url: string;
  description: string;
};

const PartnerList: PartnerItem[] = [
  {
    heading: "Publishers",
    url: "/docs/overviews/overview-publishers",
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    Svg: require("@site/static/img/documents-icon.svg").default,
    animationData: documentsAnimation,
    description:
      "Maintain audience targeting without cookies for better impression monetization and more relevance.",
  },
  {
    heading: "Advertisers",
    url: "/docs/overviews/overview-advertisers",
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    Svg: require("@site/static/img/chart-icon.svg").default,
    animationData: chartIconAnimation,
    description:
      "Leverage first-party data for more durable identity strategies and better addressability.",
  },
  {
    heading: "Demand-Side Platforms",
    url: "/docs/overviews/overview-dsps",
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    Svg: require("@site/static/img/flowchart-icon.svg").default,
    animationData: flowchartAnimation,
    description:
      "Maintain cross-device identity resolution and one-to-one targeting connections with deterministic IDs for more precision and omnichannel reach.",
  },
  {
    heading: "Data Providers",
    url: "/docs/overviews/overview-data-providers",
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    Svg: require("@site/static/img/cloud-upload-icon.svg").default,
    animationData: uploadAnimation,
    description:
      "Connect audience segments with deterministic signals across all partners for a cohesive identity offering.",
  },
];

type PartnerProps = {
  partnerItem: PartnerItem;
  playAnimation?: boolean;
};

function Partner({ partnerItem, playAnimation }: PartnerProps): JSX.Element {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { heading, Svg, animationData, url, description } = partnerItem;
  const lottieRef = React.useRef<LottieRefCurrentProps>(null);
  const isMobile = useIsMobile();

  React.useEffect(() => {
    if (!isMobile) {
      if (playAnimation && lottieRef.current) {
        lottieRef.current.play?.();
      } else {
        lottieRef.current?.pause?.();
      }
    }
  }, [playAnimation, isMobile]);

  return (
    <div className={styles.card}>
      <Link className={clsx("text-11-o-clock", styles.cardLink)} to={url}>
        <div className={styles.cardTitle}>
          <h3 className="type-delta">
            <span>{heading}</span> <RightArrow />
          </h3>
        </div>
        <p className="type-paragraph">{description}</p>
        {prefersReducedMotion || isMobile ? (
          <Svg className={styles.featureImage} aria-hidden={true} />
        ) : (
          <Lottie
            animationData={animationData}
            className={styles.animationIcon}
            loop={false}
            lottieRef={lottieRef}
            autoplay={false}
          />
        )}
      </Link>
    </div>
  );
}

export default function HomepagePartnersSegment(): JSX.Element {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        rootMargin: "0px",
        threshold: 0.75, //fire animations when 50% of the element is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [sectionRef]);

  return (
    <section
      className={clsx(
        "bg-11-o-clock text-white",
        styles.homepagePartnersSegment
      )}
      ref={sectionRef}
    >
      <div className="container">
        <SectionHeader
          heading="It works with you, however you work"
          subheading={
            "Easily integrate Unified ID 2.0 into your existing workflows through a flexible framework of implementation types."
          }
          extraClass={styles.header}
        />
        <div className={clsx(styles.partnerList)}>
          {PartnerList.map((props, idx) => (
            <Partner key={idx} partnerItem={props} playAnimation={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
