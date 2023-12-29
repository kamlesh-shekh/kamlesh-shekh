import { createSlice } from "@reduxjs/toolkit";
import { editId } from "../../src/Item";

const oldData = JSON.parse(localStorage.getItem("data"));

const initializeState = {
  data: oldData ? oldData : [],
};

const itemSlice = createSlice({
  name: "storeData",
  initialState: initializeState,

  reducers: {
    addItem(state, action) {
      const list = action.payload;
      const repet = state.data.find((cur) => cur.id === editId);
      if (!repet) {
        state.data.push({
          id: Date.now(),
          item: list.item,
          paked: false,
        });
      } else {
        repet.item = list.item;
      }

      localStorage.setItem("data", JSON.stringify(state.data));
    },

    pakedItem(state, action) {
      const check = action.payload;
      state.data = state.data.map((cur) =>
        cur.id === check ? { ...cur, paked: !cur.paked } : cur
      );
    },
    deleteItem(state, action) {
      const dlt = action.payload;
      state.data = state.data.filter((cur) => cur.id !== dlt);

      localStorage.setItem("data", JSON.stringify(state.data));
    },
  },
});

export const itemAction = itemSlice.actions;
export default itemSlice;
