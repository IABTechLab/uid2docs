import styles from "./styles.module.scss";
import { ReactNode, useContext, useEffect } from "react";
import { CustomTagsContext } from "./CustomTagsContext";

export interface CustomTagsContainerProps {
  tags: string; // comma-separated values
  title: string;
  children: ReactNode;
}

export default function CustomTagsContainer({
  tags = "",
  children,
}: CustomTagsContainerProps) {
  const [{ filter }, setState] = useContext(CustomTagsContext);

  const tagList = tags.split(",").map((tag) => tag.trim());

  useEffect(() => {
    setState((state) => ({
      ...state,
      // create unique array of all tags
      tags: Array.from(new Set([...state.tags, ...tagList])),
    }));
  }, [tags]);

  return (
    <div
      className={
        tagList.includes(filter) ? styles["custom-tags-container-visible"] : ""
      }
    >
      {children}
    </div>
  );
}
