import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AppRoute, MIN_WIDTH } from './config';
import Layout from './components/Layout';
import Build from './pages/Build';
import { useEffect, useState } from 'react';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import NewBuild from './pages/NewBuild';
import { useAppDispatch } from './store';
import { checkAuthAction } from './store/async-actions';
import EditItem from './pages/EditItem';
import EditBuild from './pages/EditBuild';
import Message from './components/Message';

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
    path: `${AppRoute.EditItem}/:id`,
    element: <EditItem />,
  },
  {
    path: `${AppRoute.EditBuild}/:id`,
    element: <EditBuild />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

function App() {
  const dispatch = useAppDispatch();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    dispatch(checkAuthAction());
  }, [dispatch]);

  useEffect(() => {
    function onResizeHandler() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', onResizeHandler);

    return () => window.removeEventListener('resize', onResizeHandler);
  }, []);

  if (width < MIN_WIDTH) return <Message msg="This app works only on tablets and desktop" />;

  return <RouterProvider router={router} />;
}

export default App;
