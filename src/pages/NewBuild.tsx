import { useNavigate } from 'react-router-dom';
import { useMyContext } from '../hooks/useMyContext';
import { AppRoute } from '../config';
import Loader from '../components/Loader';
import Wrapper from '../ui/Wrapper';
import { useEffect, useState } from 'react';
import { Item } from '../types';
import { getAllItems } from '../api';

export default function NewBuild() {
  const { auth } = useMyContext();
  const navigate = useNavigate();
  const [items, setItems] = useState<null | Item[]>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const { data } = await getAllItems();

      data && setItems(data);
      setIsLoading(false);
    }

    getData();
  }, []);
  console.log(items);

  if (auth === 'unknown' || isLoading) return <Loader />;
  if (auth === 'noauth') navigate(AppRoute.Main);

  return (
    <>
      tab1
      <Wrapper>test</Wrapper>
    </>
  );
}
