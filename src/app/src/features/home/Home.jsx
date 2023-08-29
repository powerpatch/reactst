import { Box, Link, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Status from 'features/status/Status';
import { Link as RouterLink, useLoaderData } from 'react-router-dom';

export default function Home() {
  let data = {};
  data = useLoaderData();
  return (
    <>
      <Status />
    </>
  );
}

export async function homeLoader() {
  return {
    date: new Date().toISOString(),
  };
}

