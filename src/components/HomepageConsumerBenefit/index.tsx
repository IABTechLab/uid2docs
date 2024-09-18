import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";
import { pushGtmEvent } from "@site/src/utils/pushGtmEvent";
import styles from "./styles.module.scss";
import OutboundArrow from "@site/static/img/arrow-outbound-link.svg";

export default function HomepageConsumerBenefit(): JSX.Element {
  const pageViewData = {
    event: "button_click",
    click_item: "home page consumer benefit",
    click_text: "Manage my UID2",
    link_url: "https://www.transparentadvertising.com/",
  };

  return (
    <section
      className={clsx("bg-white text-11-o-clock", styles.sectionPadding)}
    >
      <div className={clsx("container", styles.flexContainer)}>
        <div className={styles.contentContainer}>
          <h2 className="text-11-o-clock type-delta">
            <Translate id="homepage.benefitsTitle">
              Unified ID 2.0 benefits
            </Translate>
          </h2>
          <p>
            <Translate id="homepage.benefitsCopy">
              Unified ID 2.0 was created to be conscious of consumer privacy. 
              Users can opt out of the use of their UID2 universally
              by visiting the opt-out portal. Participants are required to honor
              user opt-out requests made through the portal.
            </Translate>
          </p>
        </div>
        <Link
          to="https://www.transparentadvertising.com/"
          rel="noopener noreferrer"
          className={clsx("button button--11-o-clock", styles.ctaButton)}
          onClick={() => pushGtmEvent(pageViewData)}
        >
          <Translate id="homepage.benefitsButtonLabel">
            Manage my UID2
          </Translate>
          <OutboundArrow />
        </Link>
      </div>
    </section>
  );
}
