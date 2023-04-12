export const isNonEmptyString = (value: string) =>
  typeof value === "string" && value.length > 0;

export const capitalizeFirstLetter = (string: string) =>
  isNonEmptyString(string)
    ? string.charAt(0).toUpperCase() + string.slice(1)
    : string;

export const isInputElement = (element: Node) => {
  const inputTagTypes = ["input", "textarea", "select", "checkbox"];
  const castElement = element as Element;

  return (
    isNonEmptyString(castElement?.tagName) &&
    inputTagTypes.includes(castElement.tagName.toLowerCase())
  );
};

export const identifyClosestSiblingInput = (
  node: Node
): HTMLInputElement | null => {
  let currentElement: Node | null = node.nextSibling;

  while (currentElement && !isInputElement(currentElement)) {
    currentElement = currentElement.nextSibling;
  }

  return currentElement as HTMLInputElement | null;
};
