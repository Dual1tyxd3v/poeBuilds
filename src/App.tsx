// import reactLogo from './assets/react.svg';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AppRoute } from './config';
import Layout from './components/Layout';
import Build from './components/Build';

const router = createBrowserRouter([
  {
    path: AppRoute.Main,
    element: <Layout />,
    children: [
      {
        path: '/:id',
        element: <Build />,
      },
    ],
  },
  /* {
    path: AppRoute.Login,
    element: ...
  },
  {
    path: AppRoute.Add,
    element: ...
  } */
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
