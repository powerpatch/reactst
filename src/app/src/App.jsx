import './App.css';
import Layout from 'features/layout/Layout';
import Auth from 'features/auth/Auth';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home, { homeLoader } from 'features/home/Home';
import Notfound from 'features/notfound/Notfound';
import Leaderboard from 'features/leaderboard/Leaderboard';
import Status from 'features/status/Status';
import Dashboard from 'features/dashboard/Dashboard';

let router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        loader: homeLoader,
        Component: Home,
      },
      {
        path: 'dashboard/*',
        Component: Dashboard,
      },
      {
        path: 'leaderboard/*',
        Component: Leaderboard,
      },
      {
        path: 'status/*',
        Component: Status,
      },
      {
        path: 'auth/*',
        Component: Auth,
      },
      {
        path: '*',
        Component: Notfound,
      },
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}