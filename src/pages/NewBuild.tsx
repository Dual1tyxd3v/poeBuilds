import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../config';
import Wrapper from '../ui/Wrapper';
import { MouseEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import NewItem from '../components/NewItem';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import CreateBuild from '../components/CreateBuild';
import { useSelector } from 'react-redux';
import { getAuthStatus, getIsLoading, getItemsFromState, getMessage } from '../store/selectors';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useAppDispatch } from '../store';
import { getItemsAction } from '../store/async-actions';

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
  const auth = useSelector(getAuthStatus);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('item');
  const items = useSelector(getItemsFromState);
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
        {activeTab === 'item' ? (
          <NewItem />
        ) : (
          <CreateBuild updateData={updateData} items={items || []} />
        )}
      </Wrapper>
    </>
  );
}
