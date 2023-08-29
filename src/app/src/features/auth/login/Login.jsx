import { Button, Link, Paper, Stack, TextField, Typography, styled } from '@mui/material';
import { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Link as RouterLink } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
}));

export default function Login() {
  const [value, setValue] = useState('');
  return (
    <Grid container display="flex" direction="column" alignItems="center">
      <Grid container display="flex" direction="column" width="100%" maxWidth="24rem" marginTop="1rem">
        <Item elevation={4} sx={{ placeSelf: 'center', width: '100%', borderRadius: '12px' }}>
          <Grid container display="flex" alignItems="center"
            sx={{
              backgroundColor: 'primary.main',
              borderRadius: '12px 12px 0px 0px',
              padding: '16px',
              color: 'primary.contrastText'
            }}>
            <Grid xs>
              <Typography variant="h6" align="center">SpaceTraders Login</Typography>
            </Grid>
          </Grid>
          <Stack sx={{ padding: '1rem' }}>
            <form>
              <Stack gap={2}>
                <TextField id="token" label="Token" variant="outlined" type="text" value={value} onChange={({ target: { value } }) => setValue(value)} required />
              </Stack>
            </form>
            <Button variant="contained" type="submit" sx={{ marginTop: '16px', display: 'inline' }}>Login</Button>
          </Stack>
        </Item>
        <Typography variant="caption" alignSelf={"end"}>Need an access token? Click <Link component={RouterLink} to="../register" relative={'path'}> here</Link> to register.</Typography>
      </Grid>
    </Grid>
  );
}
