import { Outlet } from 'react-router-dom';
import Loader from './Loader';
import Wrapper from '../ui/Wrapper';
import Nav from './Nav';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getBuildsFromState, getIsLoading, getMessage } from '../store/selectors';
import { getBuildsAction, getItemsAction } from '../store/async-actions';
import { useAppDispatch } from '../store';
import Message from './Message';

export default function Layout() {
  const isLoading = useSelector(getIsLoading);
  const builds = useSelector(getBuildsFromState);
  const message = useSelector(getMessage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBuildsAction());
    dispatch(getItemsAction());
  }, []);

  if (isLoading) return <Loader />;
  return (
    <Wrapper>
      {message && <Message msg={message} />}
      <Nav builds={builds} />
      <Outlet />
    </Wrapper>
  );
}
