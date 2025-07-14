import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";

type TagState = {
  tags: string[];
  filter: string | undefined;
};

type TagContext = [TagState, Dispatch<SetStateAction<TagState>>];

export const CustomTagsContext = createContext<TagContext>(undefined);

export function CustomTagsContextProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<TagState>({
    tags: ["All"],
    filter: "All",
  });

  return (
    <CustomTagsContext.Provider value={[state, setState]}>
      {children}
    </CustomTagsContext.Provider>
  );
}
