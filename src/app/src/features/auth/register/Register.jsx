import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useLazyGetFactionsQuery, usePostRegisterMutation } from 'services/spacetraders';
import { useForm, Controller } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { FormControl, InputLabel, LinearProgress, Link, MenuItem, Paper, Select, Stack, Typography, styled } from '@mui/material';
import FactionCard from 'features/factions/FactionCard';
import Grid from '@mui/material/Unstable_Grid2';
import { Rocket, RocketLaunch } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { setToken } from '../authSlice';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
}));

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [focusedInput, setFocusedInput] = useState('');
  const [currentFaction, setCurrentFaction] = useState({});
  const [takenNames, setTakenNames] = useState([]);
  const [factions, setFactions] = useState([]);

  const { handleSubmit, control, setValue, getValues, trigger, formState: { errors, isValid } } = useForm({
    defaultValues: {
      agentSymbol: '',
      faction: '',
    },
    mode: 'onChange',
  });

  const [getFactions] = useLazyGetFactionsQuery();
  const [postRegister, { isLoading: registerLoading }] = usePostRegisterMutation();

  async function onSubmit() {
    try {
      const response = await postRegister({ symbol: getValues('agentSymbol'), faction: getValues('faction') }).unwrap();
      if (response.data) {
        const {
          token,
          agent,
          contract,
          faction,
          ship,
        } = response.data;
        dispatch(setToken(token));
        navigate('/dashboard', { relative: 'path' });
      }
    } catch (error) {
      if (error) {
        const { status, data: { error: { code, data, message } } } = error;
        if (code === 4111) setTakenNames([...takenNames, data.agentSymbol]);
        if (code === 422) setTakenNames([...takenNames, ...factions.map(({ symbol }) => symbol)]);
      }
    }
  }

  useEffect(() => {
    async function lazyFactions(page = 1, limit = 20, pages = 1) {
      try {
        let factions = [];
        /** @todo: Parallelization */
        for (; page <= pages; page++) {
          const response = await getFactions({ page, limit });
          if (response.data) {
            factions.push(...response.data.data);
            if (response.data?.meta?.total) pages = Math.ceil(response.data.meta.total / limit);
          }
          if (response.error) throw response.error;
        }
        const sortedFactions = factions
          .reduce((acc, faction) => acc.some(({ symbol }) => symbol === faction.symbol) ? acc : [...acc, faction], [])
          .sort((a, b) => a.symbol.localeCompare(b.symbol));
        setFactions(sortedFactions);
        setValue('faction', sortedFactions[0].symbol);
        setCurrentFaction(sortedFactions[0]);
      } catch (error) {
        const delay = error?.data?.error?.data?.retryAfter * 1000 || 1000;
        setTimeout(async () => await lazyFactions(page, limit, pages), delay);
      }
    }
    lazyFactions();
  }, [getFactions, setValue]);

  useEffect(() => { if (takenNames.length) trigger('agentSymbol', { shouldFocus: true }); }, [takenNames, trigger]);

  const focusHandlers = (name) => ({
    error: focusedInput !== name && !!errors[name],
    onFocus: () => setFocusedInput(name),
    onBlur: () => setFocusedInput(''),
  });

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
            {
              !isValid
                ? <Rocket />
                : <RocketLaunch />
            }
            <Grid xs>
              <Typography variant="h6" align="center">SpaceTraders Registration</Typography>
            </Grid>
          </Grid>
          <Stack sx={{ padding: '1rem' }}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
              <Stack gap={2}>
                <Controller
                  name="agentSymbol"
                  control={control}
                  rules={{ validate: { symbol: (value) => takenNames.includes(value.toUpperCase()) ? `${value} is unavailable` : null }, required: true, maxLength: 14, minLength: 3, pattern: /^[A-z-_]*$/ }}
                  render={({ field }) => <TextField {...{ ...field, ...focusHandlers(field.name) }}
                    id={field.name}
                    label="Agent Symbol"
                    variant="outlined"
                    color={!errors[field.name] ? 'primary' : 'warning'}
                    disabled={registerLoading}
                    /** @todo: Update this margin hack */
                    helperText={<span style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '-14px', marginRight: '-14px' }}>
                      <Typography variant="caption">{
                        errors?.[field.name]?.type === 'required'
                          ? 'Required value'
                          : errors?.[field.name]?.type === 'minLength'
                            ? 'Minimum 3 characters'
                            : errors?.[field.name]?.type === 'symbol'
                              ? errors?.[field.name]?.message
                              : errors?.[field.name]?.type === 'pattern'
                                ? 'Invalid characters entered'
                                : process.env.NODE_ENV === 'development' ? JSON.stringify(errors?.[field.name]) : 'Unknown error'
                      }</Typography>
                      <Typography variant="caption">{`${field.value.length} / 14`}</Typography>
                    </span>}
                    inputProps={{ minLength: 3, maxLength: 14 }}
                  />}
                />
                <Controller
                  name="faction"
                  control={control}
                  rules={{ required: true }}
                  render={
                    ({ field }) => <FormControl sx={{ minWidth: '200px' }}>
                      <InputLabel id="factionLabel">Faction</InputLabel>
                      <Select {...{ ...field, ...focusHandlers(field.name) }}
                        id={field.name}
                        label="Faction"
                        labelId="factionLabel"
                        disabled={registerLoading}
                        onChange={(e) => { field.onChange(e); setCurrentFaction(factions.find((faction) => faction.symbol === e.target.value)) }}
                      >
                        {factions.map((faction, i) => <MenuItem key={i} value={faction.symbol}>{faction.symbol}</MenuItem>)}
                      </Select>
                    </FormControl>
                  }
                />
                <FactionCard faction={currentFaction} />
                <Button disabled={registerLoading} variant="contained" type="submit" sx={{ marginTop: '16px', display: 'inline', position: 'relative' }}>Register{registerLoading && (
                  <LinearProgress sx={{ visibility: registerLoading ? 'visible' : 'hidden', position: 'absolute', inset: 0, height: '100%', width: '100%', opacity: 0.5 }} />
                )}</Button>
              </Stack>
            </form>
          </Stack>
        </Item>
        <Typography variant="caption" alignSelf={"end"}>Already have an access token? Click <Link component={RouterLink} to="../login" relative={'path'}> here</Link> to login.</Typography>
      </Grid>
    </Grid>
  );
}