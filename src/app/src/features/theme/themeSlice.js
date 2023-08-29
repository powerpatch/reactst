import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'dark',
  primary: window.localStorage.getItem('primary') || 'blue',
  secondary: 'blueGrey',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark';
    },
    setDarkMode: (state, { payload: darkMode }) => {
      state.mode = darkMode ? 'dark' : 'light';
    },
    setPrimaryColor: (state, { payload: color }) => {
      state.primary = color;
      window.localStorage.setItem('primary', color);
    },
    setSecondaryColor: (state, { payload: color }) => {
      state.secondary = color;
    },
  },
});

export const { toggleMode, setDarkMode, setPrimaryColor, setSecondaryColor } = themeSlice.actions;

export default themeSlice.reducer;