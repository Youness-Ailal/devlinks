import { getCurrentUser as getUserApi, updateUser } from "@/services/authApi";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import toast from "react-hot-toast";

type userType = {
  status: "idle" | "pending" | "error" | "";
  authorised: boolean;
  error: string;
  isUpdatingUser: boolean;
  updateError: string;
  previewAvatar: string | ArrayBuffer | null;
  user: {
    firstName?: string;
    lastName?: string;
    email?: string;
    avatar?: string;
  };
};

const intialeState: userType = {
  status: "",
  authorised: false,
  error: "",
  isUpdatingUser: false,
  updateError: "",
  previewAvatar: "",
  user: {},
};
export const getCurrentUserThunk = createAsyncThunk(
  "user/getCurrentUser",
  async () => {
    const data = await getUserApi();
    return data;
  }
);
export const updateUserThunk = createAsyncThunk(
  "user/updateUser",
  async ({
    firstName,
    lastName,
    avatar,
  }: {
    firstName: string;
    lastName: string;
    avatar: File[];
  }) => {
    const data = await updateUser({ firstName, lastName, avatar });
    return data;
  }
);

const profileSlice = createSlice({
  name: "user",
  initialState: intialeState,
  reducers: {
    addPreviewAvatar(
      state,
      action: PayloadAction<string | ArrayBuffer | null>
    ) {
      state.previewAvatar = action.payload;
    },
    removePreviewAvatar(state) {
      state.previewAvatar = "";
    },
  },
  extraReducers: builder =>
    builder
      .addCase(getCurrentUserThunk.pending, state => {
        state.status = "pending";
      })
      .addCase(getCurrentUserThunk.fulfilled, (state, action) => {
        state.status = "idle";
        state.authorised = action.payload?.role === "authenticated";
        state.user = {
          firstName: action.payload?.user_metadata?.firstName || "",
          lastName: action.payload?.user_metadata?.lastName || "",
          email: action.payload?.email,
          avatar: action.payload?.user_metadata.data?.avatar || "",
        };
      })
      .addCase(getCurrentUserThunk.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message || "error";
      })
      .addCase(updateUserThunk.pending, state => {
        state.isUpdatingUser = true;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.isUpdatingUser = false;
        state.user = {
          firstName: action.payload?.user_metadata?.firstName || "",
          lastName: action.payload?.user_metadata?.lastName || "",
          email: action.payload?.email,
          avatar: action.payload?.user_metadata.data?.avatar || "",
        };
        toast.success("Profile changes successfuly updated!");
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.isUpdatingUser = false;
        state.updateError = action.error.message || "error";
        toast.error(
          action?.error?.message || "Profile Changes could not be updated"
        );
      }),
});

export default profileSlice.reducer;

export const { addPreviewAvatar, removePreviewAvatar } = profileSlice.actions;
