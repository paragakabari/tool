import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  currentPage: "",
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.sidebar,
        };
      },
    },
  },
});

export const { setCurrentPage } = sidebarSlice.actions;

export const selectCurrentPage = (state) => state.auth.currentPage;

export default sidebarSlice.reducer;
