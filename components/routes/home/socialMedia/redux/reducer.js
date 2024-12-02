import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  facebookPostData: {
    avatar: "",
    avatarName: "",
    postImage: "",
    postImageName: "",
    userName: "",
    location: "",
    postDate: "",
    description: "",
    likeCount: 1,
    commentCount: 1,
    shareCount: 1,
    isLiked: false,
    isCommented: false,
    fcUserName: "",
    fcText: "",
    scUserName: "",
    scText: "",
  },
};

export const socialMediaSlice = createSlice({
  name: "socialMedia",
  initialState,
  reducers: {
    setFacebookPostData(state, action) {
      state.facebookPostData = { ...state.facebookPostData, ...action.payload };
    },
    extraReducers: {
      [HYDRATE]: (state) => {
        return {
          ...state,
        };
      },
    },
  },
});

export const { setFacebookPostData } = socialMediaSlice.actions;

export const facebookPost = (state) => state.socialMedia.facebookPostData;

export default socialMediaSlice.reducer;
