import { useSelector, useDispatch } from 'react-redux';
import { toggleMode } from './themeSlice';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';

export default function Theme() {
  // @ts-ignore-next-line
  const mode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  return (
    <IconButton aria-label='Dark Mode Button' sx={{ ml: 1 }} onClick={() => dispatch(toggleMode())} color="inherit">
      {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  )
}