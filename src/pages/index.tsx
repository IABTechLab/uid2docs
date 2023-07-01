import React from "react";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import HomepagePartnersMarquee from "@site/src/components/HomepagePartnersMarquee";
import HomepageHero from "@site/src/components/HomepageHero";
import HomepagePartnersSegment from "@site/src/components/HomepagePartnersSegment";
import HomepageCtaStripe from "@site/src/components/HomepageCtaStripe";
import HomepageNews from "@site/src/components/HomepageNews";
import HomepageConsumerBenefit from "@site/src/components/HomepageConsumerBenefit";
import { pushGtmEvent } from "@site/src/utils/pushGtmEvent";

export default function Home(): JSX.Element {
  React.useEffect(() => {
    const pageViewData = {
      event: "Initialize_dataLayer",
      document_type: "home",
      document_title: document.title,
      article_author: undefined,
      tags: undefined,
    };

    pushGtmEvent(pageViewData);
  }, []);
  return (
    <Layout
      title={`About`}
      description="Unified ID (UID) offers cookieless, deterministic identity for advertisers, publishers, data providers and DSPs."
    >
      <main>
        <HomepageHero />
        <HomepagePartnersMarquee />
        <HomepageFeatures />
        <HomepagePartnersSegment />
        <HomepageConsumerBenefit />
        <HomepageCtaStripe />
        <HomepageNews />
      </main>
    </Layout>
  );
}
