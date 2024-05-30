import { useSelector } from 'react-redux';
import { getAuthStatus, getIsLoading, getItemsFromState, getMessage } from '../store/selectors';
import { useNavigate, useParams } from 'react-router-dom';
import { AppRoute } from '../config';
import EmptyPage from '../ui/EmptyPage';
import Wrapper from '../ui/Wrapper';
import { useEffect } from 'react';
import { useAppDispatch } from '../store';
import { getItemsAction } from '../store/async-actions';
import Loader from '../components/Loader';
import NewItem from '../components/NewItem';
import BackLink from '../components/BackLink';
import styled from 'styled-components';
import Message from '../components/Message';

const Controls = styled.div`
  position: relative;
  height: 2rem;
`;

export default function EditItem() {
  const navigate = useNavigate();
  const authStatus = useSelector(getAuthStatus);
  const items = useSelector(getItemsFromState);
  const isLoading = useSelector(getIsLoading);
  const message = useSelector(getMessage);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    authStatus === 'auth' && dispatch(getItemsAction());
  }, [dispatch, authStatus]);

  if (authStatus === 'noauth') navigate(AppRoute.Main);

  if (isLoading || !items.length) return <Loader />;

  if (!id || isNaN(+id))
    return (
      <Wrapper>
        <EmptyPage>Wrong ID</EmptyPage>
      </Wrapper>
    );

  const item = items.find((item) => item.id === +id);

  if (items.length && !item)
    return (
      <Wrapper>
        <EmptyPage>Item not found </EmptyPage>
      </Wrapper>
    );

  return (
    <>
      {message && <Message msg={message} />}
      <Controls>
        <BackLink />
      </Controls>
      <Wrapper style={{ height: 'calc(100% - 2rem)', minHeight: '50.6rem', overflow: 'auto' }}>
        <NewItem item={item} />
      </Wrapper>
    </>
  );
}
