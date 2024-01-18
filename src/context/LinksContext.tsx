import { useLinks } from "@/features/links/useLinks.ts";
import { createContext, useContext, useEffect, useState } from "react";
export type UserLinkType = {
  id: string;
  name: string;
  link: string;
};

type LinksState = {
  previewLinks: UserLinkType[];
  isLoading: boolean;
};

type ProfileContextValue = LinksState & {
  addPreviewLink: (socialLink: UserLinkType) => void;
  removePreviewLink: (id: string) => void;
  resetPreviewLinks: () => void;
  // setPreviewLinks: Dispatch<SetStateAction<UserLinkType[]>>;
  setPreviewLinks: (newOrder: unknown) => void;
  updatePreviewLink: ({
    id,
    newData,
  }: {
    id: string;
    newData: UserLinkType;
  }) => void;
};

const SocialLinksContext = createContext<ProfileContextValue | null>(null);

export default function SocialLinksProvider({ children }) {
  const { links, isLoading: isLoading } = useLinks();
  const { links_list } = links || {};

  const [previewLinks, setPreviewLinks] = useState<UserLinkType[]>([]);

  useEffect(() => {
    if (links_list) {
      const linkList = links_list.map(item => ({
        id: item.id,
        name: item.name,
        link: item.link,
      }));
      setPreviewLinks(linkList);
    }
  }, [links]);

  function addPreviewLink(socialLink: UserLinkType) {
    setPreviewLinks(prev => [socialLink, ...prev]);
  }
  function removePreviewLink(id: string) {
    setPreviewLinks(prev => [...prev.filter(link => link.id !== id)]);
  }
  function resetPreviewLinks() {
    setPreviewLinks([]);
  }

  function updatePreviewLink({
    id,
    newData,
  }: {
    id: string;
    newData: UserLinkType;
  }) {
    setPreviewLinks(prev =>
      [...prev].map(item => {
        if (item.id === id) return newData;
        return item;
      })
    );
  }

  const contextValue: ProfileContextValue = {
    previewLinks,
    addPreviewLink,
    removePreviewLink,
    updatePreviewLink,
    resetPreviewLinks,
    setPreviewLinks,
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
