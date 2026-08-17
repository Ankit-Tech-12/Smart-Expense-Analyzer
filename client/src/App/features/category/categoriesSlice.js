import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [
    "Food",
    "Transport",
    "Rent",
    "Shopping",
    "Health",
    "Entertainment",
    "Other",
  ],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    removeCategory: (state, action) => {
      state.categories = state.categories.filter(
        (cat) => cat !== action.payload
      );
    },
  },
});

export const { addCategory, removeCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
