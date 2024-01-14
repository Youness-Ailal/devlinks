import { createContext, useContext, useReducer } from "react";

type ProfileState = {
  previewAvatar: string;
};

const intialState: ProfileState = {
  previewAvatar: "",
};

type ProfileContextValue = ProfileState & {
  addPreviewAvatar: (value: string) => void;
  removePreviewAvatar: () => void;
};

type ActionType =
  | {
      type: "previewAvatar/add";
      payload: string;
    }
  | {
      type: "previewAvatar/remove";
    };

const ProfileContext = createContext<ProfileContextValue | null>(null);

function reducer(state: ProfileState, action: ActionType): ProfileState {
  switch (action.type) {
    case "previewAvatar/add":
      return { ...state, previewAvatar: action.payload };
    case "previewAvatar/remove":
      return { ...state, previewAvatar: "" };

    default:
      return state;
  }
}

export default function ProfileProvider({ children }) {
  const [profileState, dispatch] = useReducer(reducer, intialState);
  const { previewAvatar } = profileState;

  function addPreviewAvatar(image: string) {
    dispatch({ type: "previewAvatar/add", payload: image });
  }
  function removePreviewAvatar() {
    dispatch({ type: "previewAvatar/remove" });
  }

  const contextValue: ProfileContextValue = {
    previewAvatar,
    addPreviewAvatar,
    removePreviewAvatar,
  };
  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined)
    throw new Error("profile context used outside Profile Provider");

  return context;
}
