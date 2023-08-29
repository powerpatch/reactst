import "./App.css";
import Auth from "./features/auth/Auth";
import Status from "./features/status/Status";
import Leaderboard from "./features/leaderboard/Leaderboard";
import Login from "./features/auth/login/Login";
import Register from "./features/auth/register/Register";
import Theme from './features/theme/Theme';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import { setDarkMode } from './features/theme/themeSlice';

export default function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const dispatch = useDispatch();
  // @ts-ignore-next-line
  const mode = useSelector((state) => state.theme.mode);
  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  useEffect(() => { dispatch(setDarkMode(prefersDarkMode)); }, [prefersDarkMode]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: 'background.default',
          color: 'text.primary',
        }}
      >
        <Theme />
        <Register />
        <Login />
        <Leaderboard />
        <Auth />
        <Status />
      </Box>
    </ThemeProvider>
  );
}
