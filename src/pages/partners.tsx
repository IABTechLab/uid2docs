import React from "react";
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

const dspPartners = partnersData.filter((partner) =>
  partner.type.includes("DSP")
);

const publishersPartners = partnersData.filter((partner) =>
  partner.type.includes("Publishers")
);

const dataPartners = partnersData.filter((partner) =>
  partner.type.includes("Data")
);

const cdpPartners = partnersData.filter((partner) =>
  partner.type.includes("CDP")
);

function PartnerSection({ title, partners }: PartnerSection) {
  React.useEffect(() => {
    const pageViewData = {
      event: "Initialize_dataLayer",
      document_type: "partners",
      document_title: document.title,
      article_author: undefined,
      tags: undefined,
    };

    pushGtmEvent(pageViewData);
  }, []);
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
  return (
    <Layout
      title={"Partners"}
      description="A growing list of publishers, advertisers, data providers and DSPs leveraging Unified ID."
    >
      <main>
        <PageHeader
          heading="Unified ID 2.0 Partners"
          subheading="Access a broad marketplace of premier providers from the digital advertising ecosystem."
        />
        <div className={styles.partnersContainer}>
          <div className={clsx("container")}>
            <PartnerSection title="Publishers" partners={publishersPartners} />
            <PartnerSection title="DSPs/SSPs" partners={dspPartners} />
            <PartnerSection title="Data Providers" partners={dataPartners} />
            <PartnerSection title="CDPs / Clean Rooms" partners={cdpPartners} />
          </div>
        </div>
      </main>
    </Layout>
  );
}
