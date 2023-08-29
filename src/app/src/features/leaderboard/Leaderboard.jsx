import { useGetStatusQuery } from '../../services/spacetraders';

export default function Leaderboard() {
  const { data, error, isLoading } = useGetStatusQuery();

  const mostCredits = data?.leaderboards?.mostCredits.map(({ agentSymbol, credits }) => <tr key={agentSymbol}><td>{agentSymbol}</td><td>{credits}</td></tr>)
  const mostSubmittedCharts = data?.leaderboards?.mostSubmittedCharts.map(({ agentSymbol, chartCount }) => <tr key={agentSymbol}><td>{agentSymbol}</td><td>{chartCount}</td></tr>)

  return (
    <div>
      <h3>Most Credits</h3>
      <table>
        <thead>
          <tr>
            <th>AGENT SYMBOL</th>
            <th>CREDITS</th>
          </tr>
        </thead>
        <tbody>
          {mostCredits}
        </tbody>
      </table>
      <h3>Most Charts</h3>
      <table>
        <thead>
          <tr>
            <th>AGENT SYMBOL</th>
            <th>CHARTS</th>
          </tr>
        </thead>
        <tbody>
          {mostSubmittedCharts}
        </tbody>
      </table>
    </div >
  );
}
