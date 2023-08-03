import React from "react";
import { translate } from "@docusaurus/Translate";
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
  const componentData = {
    title: translate({
      id: "homepage.metaTitle",
      message: "About",
      description: "The homepage meta title",
    }),
    description: translate({
      id: "homepage.metaDescription",
      message:
        "Unified ID (UID) offers cookieless, deterministic identity for advertisers, publishers, data providers and DSPs.",
      description: "The homepage meta description",
    }),
  };

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
    <Layout title={componentData.title} description={componentData.description}>
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
