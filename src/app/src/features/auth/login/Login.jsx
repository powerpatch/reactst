import { TextField } from '@mui/material';
import { useState } from 'react';

export default function Login() {
  const [value, setValue] = useState('');
  let input = "";
  function onChange(event) {
    setValue(event.target.value);
  }
  return (
    <div>
      <h1>Login</h1>
      <form>
        <h2>SpaceTraders Token</h2>
        <TextField id="token" label="Token" variant="outlined" type="text" value={value} onChange={({ target: { value } }) => setValue(value)} required />
      </form>
    </div>
  );
}
