/* eslint-disable @typescript-eslint/no-var-requires */
import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import styles from "./styles.module.scss";

type ArticleItem = {
  title: string;
  url: string;
  date: string;
};

const ArticleList: ArticleItem[] = [
  // {
  //   title: "AWS",
  //   url: "https://digiday.com/media/amazon-and-the-trade-desk-ink-deal-to-deploy-uid2/",
  //   date: "June 22, 2022",
  // },
  {
    title: "P&G",
    url: "https://www.thecurrent.com/p-g-joins-others-in-supporting-unified-id-2-0-to-help-improve-the-consumer-ad-experience",
    date: "September 1, 2022",
  },
  {
    title: "Salesforce",
    url: "https://www.businesswire.com/news/home/20220921005104/en/The-Trade-Desk-Announces-Salesforce-CDP-Now-Able-to-Activate-Unified-ID-2.0",
    date: "September 21, 2022",
  },
  {
    title: "Environics Analytics",
    url: "https://www.globenewswire.com/news-release/2022/09/22/2520965/0/en/Environics-Analytics-Announces-Adoption-of-Unified-ID-2-0.html",
    date: "September 22, 2022",
  },
  {
    title: "LineTV (Taiwan)",
    url: "https://www.cdns.com.tw/articles/662817",
    date: "September 22, 2022",
  },
  {
    title: "Optable",
    url: "https://www.prnewswire.com/news-releases/optable-integrates-with-the-trade-desk-to-securely-transact-unified-id-2-0--301635816.html?tc=eml_cleartime",
    date: "September 29, 2022",
  },
  {
    title: "RainBarrel",
    url: "https://www.rbarrel.com/press-release/rainbarrel-integrates-with-the-trade-desk",
    date: "October 12, 2022",
  },
  {
    title: "Narrative",
    url: "https://www.prnewswire.com/news-releases/narrative-releases-software-to-enable-direct-integration-with-the-trade-desk-via-unified-id-2-0--301660341.html",
    date: "October 27, 2022",
  },
  {
    title: "Drako",
    url: "https://www.prnewswire.com/news-releases/drako-supports-unified-id-2-0-in-new-partnership-with-the-trade-desk-301680737.html",
    date: "November 17, 2022",
  },
  {
    title: "Paramount",
    url: "https://www.paramount.com/press/paramount-advertising-adds-unified-id-20-to-scale-identity-on-connected-tv",
    date: "January 4, 2023",
  },
  {
    title: "Rave",
    url: "https://venturebeat.com/business/rave-supports-unified-id-2-0-in-new-partnership-with-the-trade-desk/",
    date: "February 3, 2023",
  },
  {
    title: "NBCU",
    url: "https://www.thecurrent.com/nbcuniversal-unified-id-2-0-peacock",
    date: "March 8, 2023",
  },
  {
    title: "Warner Bros. Discovery",
    url: "https://wbd.com/warner-bros-discovery-adopts-unified-id-2-0-solution-across-max-and-discovery/",
    date: "June 21, 2023",
  },
];

function ArticleCard({ title, url, date }: ArticleItem) {
  return (
    <div>
      <Link to={url} className={clsx("bg-white", styles.card)}>
        <div className={styles.cardBody}>
          <h3 className="type-paragraph-large text-11-o-clock">{title}</h3>
          <hr className={styles.divider} />
          <p className="type-eta text-gray-600">{date}</p>
        </div>
      </Link>
    </div>
  );
}

export default function HomepageNews(): JSX.Element {
  return (
    <section className={clsx("bg-dirty-socks", styles.homepageNews)}>
      <div className="container">
        <header className={styles.header}>
          <h2 className="type-gamma text-11-o-clock">
            Press releases and media coverage
          </h2>
        </header>
        <div className={styles.cardGrid}>
          {ArticleList.reverse().map((article, idx) => (
            <ArticleCard key={idx} {...article} />
          ))}
        </div>
      </div>
    </section>
  );
}
