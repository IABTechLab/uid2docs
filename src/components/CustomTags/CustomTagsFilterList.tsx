import { CSSProperties, useContext } from "react";
import styles from "./styles.module.scss";
import { CustomTagsContext } from "./CustomTagsContext";

interface CustomTagsFilterListProps {
  tags: string[];
  style?: CSSProperties;
  subtitle?: string;
}

export function CustomTagsFilterList({
  tags,
  style,
  subtitle,
}: CustomTagsFilterListProps) {
  const [{ filter }, setState] = useContext(CustomTagsContext);

  if (tags.length < 1) return null;

  const onClickFilter = (update: string) => {
    if (filter === update) update = "All"; // toggle off

    setState((state) => ({ ...state, filter: update }));

    const article = document.querySelector("article");

    if (article) {
      article.classList[update !== "All" && update ? "add" : "remove"](
        styles["custom-tag-toggled"],
      );
    }
  };

  return (
    <div className={styles["custom-tags-filters"]} style={style}>
      {subtitle && <b>{subtitle}</b>}

      <ul>
        {tags.map((tag) => (
          <li
            key={tag}
            className={filter === tag ? styles["custom-tags-active"] : ""}
          >
            <button onClick={() => onClickFilter(tag)}>{tag}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
