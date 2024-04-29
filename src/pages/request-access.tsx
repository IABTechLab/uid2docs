//TS and Marketo is not a good time so ignoring in eslint
import React from "react";
import { translate } from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import PageHeader from "@site/src/components/PageHeader";
import styles from "./request-access.module.scss";
import { pushGtmEvent } from "@site/src/utils/pushGtmEvent";
import {
  capitalizeFirstLetter,
  identifyClosestSiblingInput,
} from "@site/src/utils";

const componentData = {
  title: translate({
    id: "requestAccess.metaTitle",
    message: "Request Access",
    description: "The request access page meta title",
  }),
  description: translate({
    id: "requestAccess.metaDescription",
    message: "Contact us to become a UID2 partner.",
    description: "The request access page meta description",
  }),
  heading: translate({
    id: "requestAccess.heading",
    message: "Request access to UID2",
    description: "The request access page heading",
  }),
  subheading: translate({
    id: "requestAccess.subheading",
    message:
      "Interested in adopting Unified ID 2.0 (UID2) as a part of your identity strategy? Contact The Trade Desk to learn more about integrating with the UID2 framework today. Advertisers, publishers, data and measurement providers, DSPs, SSPs, and data storage and audience platforms are all welcome!",
    description: "The request access page subheading",
  }),
};

declare global {
  interface Window {
    MktoForms2: any;
  }
}

export default function RequestDemo(): JSX.Element {
  const { i18n } = useDocusaurusContext();
  const formRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    const timerId = setTimeout(() => {
      const pageViewData = {
        event: "Initialize_dataLayer",
        document_type: "request access",
        document_title: document.title,
        article_author: undefined,
        tags: undefined,
      };
      pushGtmEvent(pageViewData);
    }, 50);

    return () => clearTimeout(timerId);
  }, []);

  const formId = i18n.currentLocale === "ja" ? 3688 : 2753;

  const loadMarketoForm = React.useCallback(() => {
    if (window.MktoForms2) {
      window.MktoForms2.loadForm(
        "//pages.thetradedesk.com",
        "527-INM-364",
        formId,
      );

      window.MktoForms2.whenRendered(function (form) {
        const formEl = form.getFormElem()[0];
        const styledEls = Array.from(formEl.querySelectorAll("[style]")).concat(
          formEl,
        );
        styledEls.forEach(function (el: Element) {
          el.removeAttribute("style");
        });

        // disable remote stylesheets and local <style>
        const styleSheets = Array.from(document.styleSheets);
        styleSheets.forEach(function (ss) {
          if (
            // @ts-ignore
            [mktoForms2BaseStyle, mktoForms2ThemeStyle].indexOf(ss.ownerNode) !=
              -1 ||
            formEl.contains(ss.ownerNode)
          ) {
            ss.disabled = true;
          }
        });
      });
    }
  }, [formId]);

  React.useEffect(() => {
    // call marketo after delay to prevent race conditions on rapid multiple renders
    const timer = setTimeout(loadMarketoForm, formId);
    return () => clearTimeout(timer);
  }, [loadMarketoForm]);

  const onChange = React.useCallback((event) => {
    const target = event.target;
    const parent = target.parentElement;
    const label = parent.getElementsByTagName("label")[0];
    const value = target.value;

    value
      ? label?.classList.add(styles.hasContentLabel)
      : label?.classList.remove(styles.hasContentLabel);
  }, []);

  const onFocus = React.useCallback((event) => {
    const target = event.target;
    const parent = target.parentElement;
    const label = parent.getElementsByTagName("label")[0];

    label?.classList.add(styles.focusedLabel);
  }, []);

  const onBlur = React.useCallback((event) => {
    const target = event.target;
    const parent = target.parentElement;
    const label = parent.getElementsByTagName("label")[0];

    label?.classList.remove(styles.focusedLabel);
  }, []);

  const onFormMutation = React.useCallback(() => {
    const labelNodes = formRef?.current.querySelectorAll("label");
    const submitButton = formRef?.current.querySelector(
      'button[type="submit"]',
    );

    labelNodes.forEach((label) => {
      const siblingInput = identifyClosestSiblingInput(label);

      const tagName = capitalizeFirstLetter(
        siblingInput?.tagName.toLowerCase(),
      );
      const inputTypeClassName = `for${tagName}`;

      if (inputTypeClassName in styles) {
        label.classList.add(styles[inputTypeClassName]);
      }
    });
    if (submitButton) {
      submitButton.addEventListener("click", function () {
        pushGtmEvent({
          event: "form_submit",
          form_id: formId,
        });
      });
    }
  }, [formRef]);

  React.useEffect(() => {
    if (formRef.current) {
      // Event listeners and observer setup
      formRef.current.addEventListener("focusin", onFocus);
      formRef.current.addEventListener("focusout", onBlur);
      formRef.current.addEventListener("change", onChange);

      const observer = new MutationObserver(onFormMutation);
      observer.observe(formRef.current, { childList: true, subtree: true });

      return () => {
        if (formRef?.current) {
          formRef.current.removeEventListener("focusin", onFocus);
          formRef.current.removeEventListener("focusin", onBlur);
          formRef.current.removeEventListener("change", onChange);
          observer?.disconnect();
        }
      };
    }
  }, [formRef]);

  return (
    <Layout title={componentData.title} description={componentData.description}>
      <PageHeader
        heading={componentData.heading}
        subheading={componentData.subheading}
      />
      <main className={styles.requestDemoPage}>
        <div className="container">
          <div
            className="row"
            style={{
              justifyContent: "center",
            }}
          >
            <div className="col col--5">
              <div className="marketo-form">
                <form ref={formRef} id={`mktoForm_${formId}`} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
