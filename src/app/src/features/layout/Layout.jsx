import { Outlet } from 'react-router-dom';
import { Link as RouterLink, useLoaderData } from 'react-router-dom';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import { setDarkMode } from 'features/theme/themeSlice';
import { AppBar, CircularProgress, IconButton, Menu, MenuItem, Toolbar, Typography, Link } from '@mui/material';
import Theme from 'features/theme/Theme';
import MenuIcon from '@mui/icons-material/Menu';
import { amber, blue, blueGrey, brown, cyan, deepOrange, deepPurple, green, grey, indigo, lightBlue, lightGreen, lime, orange, pink, purple, red, teal, yellow } from '@mui/material/colors';
import { useLazyGetSystemsQuery } from 'services/spacetraders';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import logo from 'logo.svg';

const palettes = {
  amber, blue, blueGrey, brown, cyan, deepOrange, deepPurple, green, grey, indigo, lightBlue, lightGreen, lime, orange, pink, purple, red, teal, yellow,
}

export const paletteColors = Object.keys(palettes).filter((color) => color !== 'red' && color !== 'lightBlue' && color !== 'orange');

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

export default function Layout() {
  const dispatch = useDispatch();

  const [progress, setProgress] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const menuOpen = Boolean(anchorEl);
  const onOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const onCloseMenu = () => setAnchorEl(null);

  const [getSystems] = useLazyGetSystemsQuery();

  useEffect(() => {
    async function lazySystems(page = 1, limit = 20, pages = 1) {
      try {
        let systems = [];
        /** @todo: Parallelization */
        for (; page <= pages; page++) {
          setProgress(page / pages * 100);
          const response = await getSystems({ page, limit });
          if (response.data) {
            systems.push(...response.data.data);
            if (response.data?.meta?.total) pages = Math.ceil(response.data.meta.total / limit);
          }
          if (response.error) throw response.error;
        }
        const sortedSystems = systems
          .reduce((acc, faction) => acc.some(({ symbol }) => symbol === faction.symbol) ? acc : [...acc, faction], [])
          .sort((a, b) => a.symbol.localeCompare(b.symbol));
        // setFactions(sortedSystems);
        // setValue('faction', sortedSystems[0].symbol);
        // setCurrentFaction(sortedSystems[0]);
      } catch (error) {
        const delay = error?.data?.error?.data?.retryAfter * 1000 || 1000;
        setTimeout(async () => await lazySystems(page, limit, pages), delay);
      }
    }
    // Disable systems retrieval for now
    // lazySystems();
  }, [getSystems]);

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const { mode, primary, secondary } = useSelector(({ theme }) => theme);

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: palettes[primary] || palettes.blue,
      secondary: primary[secondary] || palettes.blueGrey,
      warning: palettes.orange,
      info: palettes.lightBlue,
      error: palettes.red,
    }
  }), [mode, primary, secondary]);

  useEffect(() => { dispatch(setDarkMode(prefersDarkMode)); }, [prefersDarkMode, dispatch]);
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: 'background.default',
          color: 'text.primary',
          minHeight: '100vh',
        }}
      >
        <div style={{
          position: 'static',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <AppBar position="relative" sx={{}}>
            <AppBar position="relative" sx={{ maxWidth: '1360px', placeSelf: 'center', boxShadow: 'none' }}>
              <Toolbar>
                <Grid container justifyContent="space-between" alignItems="center" width="100%">
                  <Grid container>
                    <Link component={RouterLink} to="/">
                      <img width={64} height={64} src={logo} />
                    </Link>
                    <Theme />
                  </Grid>
                  {/* <CircularProgressWithLabel value={progress} /> */}
                  {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Loading systems...</Typography> */}
                  {/* <Link to="auth/login">
                    <Button sx={{ color: '#FFFFFF' }}>Login</Button>
                  </Link> */}
                  <IconButton
                    id="menu-button"
                    size="medium"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={onOpenMenu}
                  >
                    {/* <Link to=""> */}
                    <MenuIcon sx={{ color: '#FFFFFF' }} />
                    {/* </Link> */}
                  </IconButton>
                  <Menu
                    id="menu"
                    dir={"left"}
                    anchorEl={anchorEl}
                    open={menuOpen}
                    onClose={onCloseMenu}
                    MenuListProps={{
                      'aria-labelledby': 'menu-button',
                    }}
                  >
                    <MenuItem onClick={onCloseMenu}><Link component={RouterLink} to="auth/login">Login</Link></MenuItem>
                    <MenuItem onClick={onCloseMenu}><Link component={RouterLink} to="auth/register">Register</Link></MenuItem>
                    <MenuItem onClick={onCloseMenu}><Link component={RouterLink} to="leaderboard">Leaderboards</Link></MenuItem>
                    <MenuItem onClick={onCloseMenu}><Link component={RouterLink} to="status">Status</Link></MenuItem>
                  </Menu>
                </Grid>
              </Toolbar>

            </AppBar>
          </AppBar>
          <Outlet />
        </div>
      </Box>
    </ThemeProvider >
  );
}