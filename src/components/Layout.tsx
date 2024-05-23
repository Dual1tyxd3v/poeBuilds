import { Outlet } from 'react-router-dom';
import Loader from './Loader';
import Wrapper from '../ui/Wrapper';
import Nav from './Nav';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getBuildsFromState, getIsLoading, getMessage } from '../store/selectors';
import { getBuildsAction } from '../store/async-actions';
import { useAppDispatch } from '../store';
import Message from './Message';
import { setMessage } from '../store/reducer';

export default function Layout() {
  const isLoading = useSelector(getIsLoading);
  const dispatch = useAppDispatch();
  const builds = useSelector(getBuildsFromState);
  const message = useSelector(getMessage);

  useEffect(() => {
    dispatch(getBuildsAction());
  }, [dispatch]);

  if (isLoading) return <Loader />;
  return (
    <Wrapper>
      {message && <Message msg={message} clearMessage={() => dispatch(setMessage(''))} />}
      <Nav builds={builds} />
      <Outlet />
    </Wrapper>
  );
}
