import { Link, useNavigate } from 'react-router-dom';
import { useMyContext } from '../hooks/useMyContext';
import { AppRoute } from '../config';
import Loader from '../components/Loader';
import Wrapper from '../ui/Wrapper';
import { MouseEvent, useCallback, useEffect, useState } from 'react';
import { Item } from '../types';
import { getAllItems } from '../api';
import styled from 'styled-components';
import NewItem from '../components/NewItem';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import CreateBuild from '../components/CreateBuild';

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 4rem;
  position: relative;
`;

type TabProps = {
  $isactive: boolean;
};

const Tab = styled.button<TabProps>`
  height: 26px;
  border: none;
  background-color: transparent;
  color: ${(props) => (props.$isactive ? 'var(--color-text--active)' : 'var(--color-text--default)')};
  font-size: 16px;
  padding: 5px 0;
  font-family: 'FontinCard';
  font-weight: 600;
  background: url(/images/tab--left.png) no-repeat, url(/images/tab--right.png) no-repeat;
  background-position: top left, top right;
  background: url(/images/tab--mid.png) repeat-x;
  background-position: ${(props) => (props.$isactive ? 'bottom' : 'top')} center;
  position: relative;

  &::after,
  &::before {
    content: '';
    display: block;
    height: 26px;
    width: 19px;
    position: absolute;
    top: 0;
  }

  &::after {
    left: -19px;
    background: url(/images/tab--left.png) no-repeat;
    background-position: ${(props) => (props.$isactive ? 'bottom' : 'top')} left;
  }

  &::before {
    right: -19px;
    background: url(/images/tab--right.png) no-repeat;
    background-position: ${(props) => (props.$isactive ? 'bottom' : 'top')} right;
  }
`;

const BackLink = styled(Link)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text--primary);
  transition: color 0.2s ease, transform 0.2s ease;

  &:hover {
    color: var(--color-text--active);
    transform: translateY(-50%) scaleX(1.2);
  }
`;

export default function NewBuild() {
  const { auth } = useMyContext();
  const navigate = useNavigate();
  const [items, setItems] = useState<null | Item[]>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('item');
  const [error, setError] = useState<null | string>(null);
  const [updateTrigger, setUpdateTrigger] = useState(0);

  useEffect(() => {
    async function getData() {
      const { data, error } = await getAllItems();

      if (!data) {
        setError(error);
        return;
      }

      setItems(data);
      setIsLoading(false);
    }

    getData();
  }, [updateTrigger]);

  const updateData = useCallback(() => {
    setUpdateTrigger((prev) => ++prev);
  }, []);

  function onTabChangeHandler(e: MouseEvent) {
    const btn = e.target as HTMLButtonElement;
    setActiveTab(btn.dataset.id || '');
  }

  if (auth === 'unknown' || isLoading) return <Loader />;
  if (auth === 'noauth') navigate(AppRoute.Main);
  if (error) return <p>error</p>;

  return (
    <>
      <Tabs>
        <BackLink to={AppRoute.Main} aria-label="Back to home" title="Back to home">
          <FaLongArrowAltLeft size="3rem" />
        </BackLink>
        <Tab $isactive={activeTab === 'item'} data-id="item" onClick={onTabChangeHandler}>
          Item
        </Tab>
        <Tab $isactive={activeTab === 'build'} data-id="build" onClick={onTabChangeHandler}>
          Build
        </Tab>
      </Tabs>
      <Wrapper style={{ height: 'calc(100% - 52px)' }}>
        {activeTab === 'item' ? <NewItem updateData={updateData} /> : <CreateBuild items={items || []} />}
      </Wrapper>
    </>
  );
}
