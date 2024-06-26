import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../config';
import Wrapper from '../ui/Wrapper';
import { MouseEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import NewItem from '../components/NewItem';
import CreateBuild from '../components/CreateBuild';
import { useSelector } from 'react-redux';
import { getAuthStatus, getIsLoading, getMessage } from '../store/selectors';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useAppDispatch } from '../store';
import { getItemsAction } from '../store/async-actions';
import BackLink from '../components/BackLink';

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
  height: var(--size-tab-height);
  border: none;
  background-color: transparent;
  color: ${(props) => (props.$isactive ? 'var(--color-text--active)' : 'var(--color-text--default)')};
  font-size: 1.6rem;
  padding: 0.5rem 0;
  font-family: 'FontinCard';
  font-weight: 600;
  background: url(/images/tab--mid.png) repeat-x;
  background-position-y: ${(props) => (props.$isactive ? 'bottom' : 'top')};
  position: relative;
  background-size: 100% 200%;

  &::after,
  &::before {
    content: '';
    display: block;
    height: 2.6rem;
    width: 1.9rem;
    position: absolute;
    top: 0;
  }

  &::after {
    left: -1.9rem;
    background: url(/images/tab--left.png) no-repeat;
    background-size: 100% 200%;
    background-position: ${(props) => (props.$isactive ? 'bottom' : 'top')} left;
  }

  &::before {
    right: -1.9rem;
    background: url(/images/tab--right.png) no-repeat;
    background-size: 100% 200%;
    background-position: ${(props) => (props.$isactive ? 'bottom' : 'top')} right;
  }
`;

export default function NewBuild() {
  const auth = useSelector(getAuthStatus);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('item');
  //
  const message = useSelector(getMessage);
  const isLoading = useSelector(getIsLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getItemsAction());
  }, [dispatch]);

  function onTabChangeHandler(e: MouseEvent) {
    const btn = e.target as HTMLButtonElement;
    setActiveTab(btn.dataset.id || '');
  }

  if (auth === 'noauth') navigate(AppRoute.Main);

  return (
    <>
      {message && <Message msg={message} />}
      {isLoading && <Loader />}
      <Tabs>
        <BackLink />
        <Tab $isactive={activeTab === 'item'} data-id="item" onClick={onTabChangeHandler}>
          Item
        </Tab>
        <Tab $isactive={activeTab === 'build'} data-id="build" onClick={onTabChangeHandler}>
          Build
        </Tab>
      </Tabs>
      <Wrapper style={{ height: 'calc(100% - 26px)', minHeight: '50.6rem', overflow: 'auto' }}>
        {activeTab === 'item' ? <NewItem /> : <CreateBuild />}
      </Wrapper>
    </>
  );
}
