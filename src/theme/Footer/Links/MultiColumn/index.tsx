import React from "react";
import LinkItem from "@theme/Footer/LinkItem";
import type { Props } from "@theme/Footer/Links/MultiColumn";

type ColumnType = Props["columns"][number];
type ColumnItemType = ColumnType["items"][number];

function ColumnLinkItem({ item }: { item: ColumnItemType }) {
  return item.html ? (
    <li
      className="footer__item"
      // Developer provided the HTML, so assume it's safe.
      dangerouslySetInnerHTML={{ __html: item.html }}
    />
  ) : (
    <li key={item.href ?? item.to} className="footer__item">
      <LinkItem item={item} />
    </li>
  );
}

function Column({ column, index }: { column: ColumnType; index: number }) {
  return (
    <ul className={`footer__items footer__items--${index + 1} clean-list`}>
      {column.items.map((item, i) => (
        <ColumnLinkItem key={i} item={item} />
      ))}
    </ul>
  );
}

export default function FooterLinksMultiColumn({
  columns,
}: Props): JSX.Element {
  return (
    <div className="footer__links">
      {columns.map((column, i) => (
        <Column key={i} index={i} column={column} />
      ))}
    </div>
  );
}
