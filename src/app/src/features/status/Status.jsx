import { useGetStatusQuery } from '../../services/spacetraders';
import { Box, Link, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Leaderboard from 'features/leaderboard/Leaderboard';
import { Link as RouterLink, useLoaderData } from 'react-router-dom';

export default function Status() {
    const { data, error, isLoading } = useGetStatusQuery();
    return (
        <Grid container justifyContent="center">
            <Grid container maxWidth={1280} width="100%" direction="column" padding={4} gap={1}>
                <Grid container alignItems={"end"} gap={4}>
                    <Typography variant="h4">React SpaceTraders {data?.version}</Typography>
                </Grid>
                <Typography variant="caption">{data?.status}</Typography>

                <Typography variant="body1">{data?.description}</Typography>

                <Typography variant="body1">
                    This site was created using React and various libraries for the <Link component={RouterLink} to="https://spacetraders.io/">SpaceTraders API</Link>.
                </Typography>
                <ul style={{ marginTop: 0, marginBottom: 0 }}>
                    {
                        [
                            'react',
                            '@mui/material',
                            '@reduxjs/toolkit',
                            'react-redux',
                            'react-hook-form',
                            'react-router-dom',
                        ].map((x, i) => <li key={i}>{x}</li>)
                    }
                </ul>

                <Typography variant="h5">Current Cycle</Typography>
                <table style={{ width: 200 }}>
                    <tbody>
                        {Object.entries(data?.stats || {}).map(([key, value], i) => <tr key={i}>
                            <td>{value.toLocaleString()}</td>
                            <td>{key[0].toUpperCase().concat(key.slice(1))}</td>
                        </tr>)}
                    </tbody>
                </table>
                <Typography variant="h5">Next Reset ({data?.serverResets.frequency})</Typography>
                <ul>
                    <Typography variant="body1"><li>{new Date(data?.serverResets.next).toString()}</li></Typography>
                </ul>
                {/* <Leaderboard /> */}
                <Typography variant="h5">External Links</Typography>
                <ul style={{ marginTop: 0, marginBottom: 0 }}>
                    {data?.links.map((link, i) => <li key={i}><Link component={RouterLink} to={link.url}>{link.name}</Link></li>)}
                </ul>
                <Typography variant="h5">Announcements</Typography>
                <ul style={{ marginTop: 0, marginBottom: 0 }}>
                    {data?.announcements.map((announcement, i) => <li key={i}><Typography variant="overline" borderBottom={1} fontWeight={700}>{announcement.title}</Typography><br></br><Typography variant="body1">{announcement.body}</Typography></li>)}
                </ul>

                <Box>
                    <Typography variant="h6">Designed, developed and maintained by <Link component={RouterLink} to="https://github.com/powerpatch">powerpatch</Link></Typography>

                </Box>
                {process.env.NODE_ENV !== 'development' ? null :
                    <div>
                        <label htmlFor="textarea">Raw Status Request</label>
                        <textarea id="textarea" readOnly value={JSON.stringify(data, null, 2)} style={{ width: '100%', height: '50vh', resize: "none", color: '#FFF', backgroundColor: '#000' }}></textarea>
                    </div>
                }
            </Grid>
        </Grid>
    );
}
