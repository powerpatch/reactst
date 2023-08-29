import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: 'light',
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark';
    },
    setDarkMode: (state, { payload: darkMode }) => {
      state.mode = darkMode ? 'dark' : 'light';
    },
  },
});

export const { toggleMode, setDarkMode } = themeSlice.actions;

export default themeSlice.reducer;
