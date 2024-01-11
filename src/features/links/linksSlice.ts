import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import socialLinks, { type SocialType } from "../../data/Socials";
import { getUserLinks } from "@/services/linksApi";

type UserLinkType = {
  platform: string;
  link: string;
  icon: string;
};
type linksSliceType = {
  socialLinks: SocialType[];
  status: "idle" | "pending" | "error" | "";
  userLinks: UserLinkType[];
};
const initialState: linksSliceType = {
  socialLinks,
  status: "",
  userLinks: [],
};

export const getUserLinksThunk = createAsyncThunk(
  "links/userLinks",
  async () => {
    const data = await getUserLinks();
    return data;
  }
);
const linksSlice = createSlice({
  name: "links",
  initialState,
  reducers: {
    addDemo(state) {
      state.userLinks.push({
        platform: "",
        link: "",
        icon: "",
      });
    },
    addLink(state, action: PayloadAction<UserLinkType>) {
      const linkIndex = state.socialLinks.findIndex(
        item => item.name === action.payload.platform
      );
      console.log(linkIndex);

      if (linkIndex) {
        state.userLinks.push(action.payload);
        state.socialLinks[linkIndex].status = "used";
      }
    },
    removeLink(state, action: PayloadAction<UserLinkType>) {
      const linkIndex = state.socialLinks.findIndex(
        item => item.name === action.payload.platform
      );
      if (linkIndex) {
        state.userLinks = state.userLinks.filter(
          item => item.platform !== action.payload.platform
        );
        state.socialLinks[linkIndex].status = "unused";
      }
    },
  },
  extraReducers: builder =>
    builder
      .addCase(getUserLinksThunk.pending, state => {
        state.status = "pending";
      })
      .addCase(getUserLinksThunk.fulfilled, state => {
        state.status = "idle";
        // state.userLinks = action.payload;
      })
      .addCase(getUserLinksThunk.rejected, state => {
        state.status = "error";
      }),
});

export default linksSlice.reducer;

export const { addLink, removeLink, addDemo } = linksSlice.actions;
