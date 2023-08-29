import Auth from './features/auth/Auth';
import App from './App';
import {
  createBrowserRouter,
} from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>404</div>,
    children: [
      {
        path: 'auth',
        element: <Auth />,
      },
    ],
  },
]);