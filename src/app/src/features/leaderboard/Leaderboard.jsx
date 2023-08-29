import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useGetStatusQuery } from '../../services/spacetraders';

export default function Leaderboard() {
  const { data, error, isLoading } = useGetStatusQuery();

  const mostCredits = data?.leaderboards?.mostCredits.map(({ agentSymbol, credits }) => <tr key={agentSymbol}><td>{agentSymbol}</td><td>{credits}</td></tr>)
  const mostSubmittedCharts = data?.leaderboards?.mostSubmittedCharts.map(({ agentSymbol, chartCount }) => <tr key={agentSymbol}><td>{agentSymbol}</td><td>{chartCount}</td></tr>)

  return (
    <Grid container justifyContent="center">
      <Grid container maxWidth={1280} width="100%" direction="column" padding={4} gap={1}>
        <h3>Most Credits</h3>
        <table style={{ maxWidth: 400 }} width="100%">
          <thead>
            <tr>
              <th style={{ textAlign: "start" }}>AGENT SYMBOL</th>
              <th style={{ textAlign: "start" }}>CREDITS</th>
            </tr>
          </thead>
          <tbody>
            {mostCredits}
          </tbody>
        </table>
        <h3>Most Charts</h3>
        <table style={{ maxWidth: 400 }} width="100%">
          <thead>
            <tr>
              <th style={{ textAlign: "start" }}>AGENT SYMBOL</th>
              <th style={{ textAlign: "start" }}>CHARTS</th>
            </tr>
          </thead>
          <tbody>
            {mostSubmittedCharts}
          </tbody>
        </table>
      </Grid>
    </Grid>
  );
}
