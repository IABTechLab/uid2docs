import { useContext } from "react";
import { CustomTagsContext } from "./CustomTagsContext";
import { CustomTagsFilterList } from "./CustomTagsFilterList";

export default function CustomTagsFilters() {
  const [{ tags }] = useContext(CustomTagsContext);

  return <CustomTagsFilterList tags={tags} subtitle="Tags: " />;
}
