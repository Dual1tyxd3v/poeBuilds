import { Outlet, useNavigation } from 'react-router-dom';
import Loader from './Loader';

export default function Layout() {
  const nav = useNavigation();
  const isLoading = nav.state === 'loading';

  if (isLoading) return <Loader />;
  return (
    <div>
      <p>layout</p>
      <Outlet />
    </div>
  );
}
