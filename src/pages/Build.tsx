import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getBuildDetails } from '../api';
import Loader from '../components/Loader';
import { useCallback, useEffect, useState } from 'react';
import { Build as BuildType, Item } from '../types';
import BuildHeader from '../components/BuildHeader';
import Items from '../components/Items';
import PreviewItem from '../components/PreviewItem';
import Trade from '../components/Trade';
import { isBuildCorrect } from '../utils';
import Message from '../components/Message';
import { AppRoute } from '../config';

const Container = styled.div`
  flex: 1;
  color: var(--color-text--primary);
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  overflow: auto;
`;

export default function Build() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [build, setBuild] = useState<null | BuildType>(null);
  const [items, setItems] = useState<null | Item[]>(null);
  const [activeItem, setActiveItem] = useState<null | Item>(null);
  const nav = useNavigate();

  useEffect(() => {
    async function getData(id: number) {
      setIsLoading(true);
      const resp = await getBuildDetails(id);
      setIsLoading(false);
      if (!resp.data) return;

      setBuild(resp.data.build[0]);
      setItems(resp.data.items);
    }
    setActiveItem(null);

    if (!id) return;

    getData(+id);
  }, [id]);

  const setActive = useCallback((value: null | Item) => {
    setActiveItem(value);
  }, []);

  if (build && items && !isBuildCorrect(items, build.items))
    return <Message msg="Some items are missed" clearMessage={() => nav(AppRoute.Main)} />;

  if (isLoading) return <Loader />;

  if (!build || !items) return null;

  const { name, pob } = build;

  return (
    <Container>
      <BuildHeader name={name} pob={pob} />
      <Wrapper>
        <Trade setActive={setActive} items={items} buildItems={build.items} />
        <Items activeId={activeItem?.id || null} setActive={setActive} items={items} buildItems={build.items} />
        <PreviewItem item={activeItem} />
      </Wrapper>
    </Container>
  );
}
