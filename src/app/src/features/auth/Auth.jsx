import { Link, Route, Routes } from 'react-router-dom';
import Login from './login/Login';
import Register from './register/Register';

export default function Auth() {


  return (
    <>
      <Routes>
        <Route index element={<Link to="login">Login</Link>} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Link to="">Go back</Link>} />
      </Routes>
    </>
  );
}
