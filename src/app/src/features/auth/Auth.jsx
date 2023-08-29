import { useSelector, useDispatch } from 'react-redux';
import { setToken } from './authSlice';

export default function Auth() {
  // @ts-ignore-next-line
  const count = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  return (
    <div>
      <span>Auth</span>
      <button type="button" onClick={() => dispatch(setToken('123'))}>Test</button>
    </div>
  );
}
