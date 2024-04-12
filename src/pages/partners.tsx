import React from "react";
import { translate } from "@docusaurus/Translate";
import clsx from "clsx";
import Layout from "@theme/Layout";
import type { PartnersDataType } from "@site/src/data/partners";
import { partnersData } from "@site/src/data/partners";
import PageHeader from "@site/src/components/PageHeader";
import styles from "./partners.module.scss";
import { pushGtmEvent } from "@site/src/utils/pushGtmEvent";

type PartnerSection = {
  title: string;
  partners: PartnersDataType;
};

const componentData = {
  title: translate({
    id: "partners.metaTitle",
    message: "Partners",
    description: "The partners page meta title",
  }),
  description: translate({
    id: "partners.metaDescription",
    message:
      "A growing list of publishers, advertisers, data providers and DSPs leveraging Unified ID.",
    description: "The partners page meta description",
  }),
  heading: translate({
    id: "partners.heading",
    message: "Unified ID 2.0 Partners",
    description: "The partners page heading",
  }),
  subheading: translate({
    id: "partners.subheading",
    message:
      "Access a broad marketplace of premier providers from the digital advertising ecosystem.",
    description: "The partners page subheading",
  }),
  publishers: translate({
    id: "partners.publishersTitle",
    message: "Publishers",
    description: "The partners page publishers title",
  }),
  dsp: translate({
    id: "partners.dspTitle",
    message: "DSPs/SSPs",
    description: "The partners page DSPs/SSPs title",
  }),
  data: translate({
    id: "partners.dataTitle",
    message: "Data Providers",
    description: "The partners page data providers title",
  }),
  cdp: translate({
    id: "partners.cdpTitle",
    message: "CDPs / Clean Rooms",
    description: "The partners page CDPs / Clean Rooms title",
  }),
};

const dspPartners = partnersData.filter((partner) =>
  partner.type.includes("DSP"),
);

const publishersPartners = partnersData.filter((partner) =>
  partner.type.includes("Publishers"),
);

const dataPartners = partnersData.filter((partner) =>
  partner.type.includes("Data"),
);

const cdpPartners = partnersData.filter((partner) =>
  partner.type.includes("CDP"),
);

function PartnerSection({ title, partners }: PartnerSection) {
  return (
    <section className={styles.partnersSection}>
      <div className={clsx("container")}>
        <header className={styles.sectionHeader}>
          <h2 className="type-delta text-11-o-clock">{title}</h2>
        </header>
        <ul className={styles.partnersGrid}>
          {partners.map((partner, idx) => (
            <li key={idx} className={styles.partnerItem}>
              <img
                src={`/img/partners/${partner.logo}`}
                alt={partner.name}
                className={styles.partnerLogo}
              />
            </li>
          ))}
        </ul>
        <hr className={styles.divider} />
      </div>
    </section>
  );
}

export default function Partners(): JSX.Element {
  // Delayed GTM event to ensure the document has loaded with updated information
  React.useEffect(() => {
    const timerId = setTimeout(() => {
      const pageViewData = {
        event: "Initialize_dataLayer",
        document_type: "partners",
        document_title: document.title,
        article_author: undefined,
        tags: undefined,
      };
      pushGtmEvent(pageViewData);
    }, 50);

    return () => clearTimeout(timerId);
  }, []);

  return (
    <Layout title={componentData.title} description={componentData.description}>
      <main>
        <PageHeader
          heading={componentData.heading}
          subheading={componentData.subheading}
        />
        <div className={styles.partnersContainer}>
          <div className={clsx("container")}>
            <PartnerSection
              title={componentData.publishers}
              partners={publishersPartners}
            />
            <PartnerSection title={componentData.dsp} partners={dspPartners} />
            <PartnerSection
              title={componentData.data}
              partners={dataPartners}
            />
            <PartnerSection title={componentData.cdp} partners={cdpPartners} />
          </div>
        </div>
      </main>
    </Layout>
  );
}
