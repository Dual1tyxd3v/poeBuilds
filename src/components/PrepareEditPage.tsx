import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppRoute } from '../config';
import { useAppDispatch } from '../store';
import { getBuildsAction, getItemsAction } from '../store/async-actions';
import { getAuthStatus, getIsLoading, getMessage } from '../store/selectors';
import Loader from './Loader';
import { Build, Item } from '../types';
import EmptyPage from '../ui/EmptyPage';
import Wrapper from '../ui/Wrapper';
import NewItem from './NewItem';
import NewBuild from '../pages/NewBuild';
import BackLink from './BackLink';
import Message from './Message';
import styled from 'styled-components';

const Controls = styled.div`
  position: relative;
  height: 2rem;
`;

type PrepareEditPageProps = {
  collection: Item[] | Build[];
  type: 'items' | 'builds';
};

export default function PrepareEditPage({ collection, type }: PrepareEditPageProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const authStatus = useSelector(getAuthStatus);
  const isLoading = useSelector(getIsLoading);
  const message = useSelector(getMessage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    authStatus === 'auth' && type === 'items' ? dispatch(getItemsAction()) : dispatch(getBuildsAction());
  }, [dispatch, authStatus, type]);

  if (authStatus === 'noauth') navigate(AppRoute.Main);

  if (isLoading || !collection.length) return <Loader />;

  if (!id || isNaN(+id))
    return (
      <Wrapper>
        <EmptyPage>Wrong ID</EmptyPage>
      </Wrapper>
    );

  const target = collection.find((item) => item.id === +id);

  if (collection.length && !target)
    return (
      <Wrapper>
        <EmptyPage>{type === 'items' ? 'Item' : 'Build'} not found </EmptyPage>
      </Wrapper>
    );

  return (
    <>
      {message && <Message msg={message} />}
      <Controls>
        <BackLink />
      </Controls>
      <Wrapper style={{ height: 'calc(100% - 2rem)', minHeight: '50.6rem', overflow: 'auto' }}>
        {type === 'items' ? <NewItem item={target as Item} /> : <NewBuild />}
      </Wrapper>
    </>
  );
}
