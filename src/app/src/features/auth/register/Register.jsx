import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useGetFactionsQuery, usePostRegisterMutation } from 'services/spacetraders';

export default function Register() {
  const [agentSymbol, setAgentSymbol] = useState('');
  const [errors, setErrors] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [factions, setFactions] = useState([]);
  const { data, error, isLoading: factionsLoading, isError, refetch } = useGetFactionsQuery({ page, limit });
  const [postRegister, { isLoading: registerLoading }] = usePostRegisterMutation();

  async function onSubmit(event) {
    event.preventDefault();
    await postRegister({ symbol: 'Quantum', faction: 'QUANTUM' });
    console.log('submit');
  }

  useEffect(() => {
    if (error) console.log('ERROR', error);
    if (!data) return;
    setFactions([...factions, ...data.data]);
    console.log(factions);
    if (data.meta.total > data.meta.page * data.meta.limit) setPage(page + 1);
  }, [data]);

  useEffect(() => {
    if (error) {
      // @ts-ignore
      const delay = error.data.error.data.retryAfter * 1000 || 1000;
      console.log('delay', delay);
      console.log('ERROR', error);
      setTimeout(() => {
        refetch();
      }, 1000);
    }
  }, [error]);

  return (
    <div>
      <h1>Register</h1>
      {JSON.stringify(factions)}
      <form onSubmit={onSubmit} noValidate={false}>
        <TextField id="agentSymbol" label="Agent Symbol" variant="outlined" type="text" value={agentSymbol} onChange={({ target: { value } }) => setAgentSymbol(value)} required />
        <Button variant="contained" type="submit">Register</Button>
      </form>
      <Button variant="contained" type="button" onClick={() => setPage(page + 1)}>Test</Button>
    </div>
  );
}