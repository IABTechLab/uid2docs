/* eslint-disable @typescript-eslint/no-var-requires */
import React from "react";
import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";
import clsx from "clsx";
import styles from "./styles.module.scss";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { articleList, ArticleItem } from "@site/src/data/pressReleases";

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
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale;
  return (
    <section className={clsx("bg-dirty-socks", styles.homepageNews)}>
      <div className="container">
        <header className={styles.header}>
          <h2 className="type-gamma text-11-o-clock">
            <Translate
              id="homepage.newsTitle"
              description="Press releases and media coverage"
            >
              Press releases and media coverage
            </Translate>
          </h2>
        </header>
        <div className={styles.cardGrid}>
          {articleList
            .filter((article) => article.locale === locale)
            .reverse()
            .map((article, idx) => (
              <ArticleCard key={idx} {...article} />
            ))}
        </div>
      </div>
    </section>
  );
}
