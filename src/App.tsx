// import reactLogo from './assets/react.svg';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AppRoute, AuthStatus } from './config';
import Layout from './components/Layout';
import Build from './pages/Build';
import { createContext, useCallback, useEffect, useState } from 'react';
import { checkAuth } from './api';
import NotFound from './pages/NotFound';
import Login from './pages/Login';

export const MyContext = createContext<null | { auth: AuthStatus; changeAuthStatus: (v: AuthStatus) => void }>(null);

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
  /* 
  {
    path: AppRoute.Add,
    element: ...
  } */
  {
    path: '*',
    element: <NotFound />,
  },
]);

function App() {
  const [auth, setAuth] = useState(AuthStatus.Unknown);

  useEffect(() => {
    if (auth !== 'unknown') return;

    async function getUser() {
      const resp = await checkAuth();
      setAuth(resp);
    }

    getUser();
  }, [auth]);
  
  console.log(auth);
  const changeAuthStatus = useCallback((value: AuthStatus) => {
    setAuth(value);
  }, []);

  return (
    <MyContext.Provider value={{ auth, changeAuthStatus }}>
      <RouterProvider router={router} />
    </MyContext.Provider>
  );
}

export default App;
