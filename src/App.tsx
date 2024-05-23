import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AppRoute } from './config';
import Layout from './components/Layout';
import Build from './pages/Build';
import { useEffect } from 'react';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import NewBuild from './pages/NewBuild';
import { useAppDispatch } from './store';
import { checkAuthAction } from './store/async-actions';

const router = createBrowserRouter([
  {
    path: AppRoute.Main,
    element: <Layout />,
    children: [
      {
        path: 'build/:id',
        element: <Build />,
      },
    ],
  },
  {
    path: AppRoute.Login,
    element: <Login />,
  },

  {
    path: AppRoute.Add,
    element: <NewBuild />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
