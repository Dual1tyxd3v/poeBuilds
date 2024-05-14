import { Outlet } from 'react-router-dom';
import { getBuilds } from '../api';
import { GetBuildsResponse } from '../types';
import { useEffect, useState } from 'react';
import Loader from './Loader';
import Wrapper from '../ui/Wrapper';
import Nav from './Nav';

export default function Layout() {
  const [resp, setResp] = useState<GetBuildsResponse>({ data: [], error: null });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const response = await getBuilds();
      setResp(response);
      setIsLoading(false);
    }

    getData();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <Wrapper>
      {/* <p>layout - {resp.data.length}</p> */}
      <Nav builds={resp.data} />
      <Outlet />
    </Wrapper>
  );
}
