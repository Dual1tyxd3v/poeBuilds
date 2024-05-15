import { Outlet } from 'react-router-dom';
import { getBuilds } from '../api';
import Loader from './Loader';
import Wrapper from '../ui/Wrapper';
import Nav from './Nav';
import { useData } from '../hooks/useData';
import { Build } from '../types';

export default function Layout() {
  const { isLoading, resp } = useData(getBuilds);

  if (isLoading) return <Loader />;

  return (
    <Wrapper>
      <Nav builds={resp.data as Build[]} />
      <Outlet />
    </Wrapper>
  );
}
