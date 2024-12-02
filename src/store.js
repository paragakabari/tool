import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { sidebarSlice } from "../components/common/sidebar/redux/reducer";
import { socialMediaSlice } from "../components/routes/home/socialMedia/redux/reducer";

const makeStore = () =>
  configureStore({
    reducer: {
        [sidebarSlice.name]: sidebarSlice.reducer,
        [socialMediaSlice.name]: socialMediaSlice.reducer,
    },
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);
