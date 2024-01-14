import { useLinks } from "@/features/links/useLinks";
import { createContext, useContext, useEffect, useReducer } from "react";
export type UserLinkType = {
  id: string;
  name: string;
  link: string;
};

type LinksState = {
  previewLinks: UserLinkType[];
  isLoading: boolean;
};

const intialState: LinksState = {
  previewLinks: [],
  isLoading: false,
};

type ProfileContextValue = LinksState & {
  addPreviewLink: (socialLink: UserLinkType) => void;
  removePreviewLink: (id: string) => void;
  updatePreviewLink: ({
    id,
    newData,
  }: {
    id: string;
    newData: UserLinkType;
  }) => void;
};

type ActionType =
  | {
      type: "previewLink/add";
      payload: UserLinkType;
    }
  | {
      type: "previewLink/remove";
      payload: string;
    }
  | {
      type: "previewLink/edit";
      payload: { id: string; newData: UserLinkType };
    }
  | {
      type: "previewLinks/update";
      payload: UserLinkType[];
    };

const SocialLinksContext = createContext<ProfileContextValue | null>(null);

function reducer(state: LinksState, action: ActionType): LinksState {
  switch (action.type) {
    case "previewLink/add":
      return {
        ...state,
        previewLinks: [action.payload, ...state.previewLinks],
      };
    case "previewLink/remove":
      return {
        ...state,
        previewLinks: [
          ...state.previewLinks.filter(link => link.id !== action.payload),
        ],
      };
    case "previewLink/edit":
      return {
        ...state,
        previewLinks: [
          ...state.previewLinks.map(item => {
            if (item.id === action.payload.id) {
              return action.payload.newData;
            }
            return item;
          }),
        ],
      };
    case "previewLinks/update":
      return { ...state, previewLinks: action.payload };

    default:
      return state;
  }
}

export default function SocialLinksProvider({ children }) {
  const { links, isLoading } = useLinks();

  const [linksState, dispatch] = useReducer(reducer, intialState);
  const { previewLinks } = linksState;

  function addPreviewLink(socialLink: UserLinkType) {
    dispatch({ type: "previewLink/add", payload: socialLink });
  }
  function removePreviewLink(id: string) {
    dispatch({ type: "previewLink/remove", payload: id });
  }
  function updatePreviewLinks(data: UserLinkType[]) {
    dispatch({ type: "previewLinks/update", payload: data });
  }

  function updatePreviewLink({
    id,
    newData,
  }: {
    id: string;
    newData: UserLinkType;
  }) {
    dispatch({ type: "previewLink/edit", payload: { id, newData } });
  }
  const linksApi = links && JSON.parse(links);

  useEffect(() => {
    if (linksApi) {
      const parsedLinks = linksApi.map(item => ({
        id: item.id,
        name: item.name,
        link: item.link,
      }));
      updatePreviewLinks(parsedLinks);
    }
  }, [links]);

  const contextValue: ProfileContextValue = {
    previewLinks,
    addPreviewLink,
    removePreviewLink,
    updatePreviewLink,
    isLoading,
  };
  return (
    <SocialLinksContext.Provider value={contextValue}>
      {children}
    </SocialLinksContext.Provider>
  );
}

export function useLinksContext() {
  const context = useContext(SocialLinksContext);
  if (context === undefined)
    throw new Error(
      "social links context cannot be used outside Social Links Provider"
    );

  return context;
}
