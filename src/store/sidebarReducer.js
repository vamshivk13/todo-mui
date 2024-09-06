import { createSlice } from "@reduxjs/toolkit";
import { sidebarItems } from "../util/getSidebarItems";

const sidebarReducer = createSlice({
  name: "sidebar",
  initialState: {
    sidebarItems: sidebarItems,
    customSidebarItems: [],
  },
  reducers: {
    setSidebarItems: (state, action) => {
      state.sidebarItems = action.payload;
    },
    setCustomSidebarItems: (state, action) => {
      state.customSidebarItems = action.payload;
    },
    addCustomSidebarItem: (state, action) => {
      state.customSidebarItems = [...state.customSidebarItems, action.payload];
    },
    deleteCustomSidebarItems: (state, action) => {
      state.customSidebarItems = state.customSidebarItems.filter(
        (item) => item.id != action.payload
      );
    },
    updateSidebarItem: (state, action) => {
      state.sidebarItems = state.sidebarItems.map((item) => {
        if (item.id == action.payload.id) {
          return { ...item, ...action.payload.toUpdate };
        } else {
          return item;
        }
      });
    },
    updatCustomSidebarItem: (state, action) => {
      state.customSidebarItems = state.customSidebarItems.map((item) => {
        if (item.id == action.payload.id) {
          return { ...item, ...action.payload.toUpdate };
        } else {
          return item;
        }
      });
    },
  },
});

export const sidebarReducerActions = sidebarReducer.actions;
export default sidebarReducer.reducer;
