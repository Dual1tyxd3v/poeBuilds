import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useCallback, useState } from 'react';
import { Item } from '../types';
import BuildHeader from '../components/BuildHeader';
import Items from '../components/Items';
import PreviewItem from '../components/PreviewItem';
import Trade from '../components/Trade';
import { isBuildCorrect } from '../utils';
import { useSelector } from 'react-redux';
import { getBuildsFromState, getItemsFromState } from '../store/selectors';

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

const EmptyPage = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 2.4rem;
  color: var(--color-text--primary);
`;

export default function Build() {
  const { id } = useParams();
  const [activeItem, setActiveItem] = useState<null | Item>(null);
  const items = useSelector(getItemsFromState);
  const builds = useSelector(getBuildsFromState);

  const setActive = useCallback((value: null | Item) => {
    setActiveItem(value);
  }, []);

  if (!id) return null;

  const build = builds.find((build) => build.id === +id);

  if (!build) {
    return <EmptyPage>Build not founded</EmptyPage>;
  }

  if (build && items && !isBuildCorrect(items, build.items)) {
    return (
      <EmptyPage>
        Some items are missed
        <br />
        Choose another build
      </EmptyPage>
    );
  }

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
