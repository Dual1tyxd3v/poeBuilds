import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppRoute } from '../config';
import { useAppDispatch } from '../store';
import { getBuildsAction, getItemsAction } from '../store/async-actions';
import { getAuthStatus, getIsLoading } from '../store/selectors';
import Loader from './Loader';
import { Build, Item } from '../types';
import EmptyPage from '../ui/EmptyPage';
import NewItem from './NewItem';
import CreateBuild from './CreateBuild';

type PrepareEditPageProps = {
  collection: Item[] | Build[];
  type: 'items' | 'builds';
};

export default function PrepareEditPage({ collection, type }: PrepareEditPageProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const authStatus = useSelector(getAuthStatus);
  const isLoading = useSelector(getIsLoading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authStatus !== 'auth') return;

    dispatch(getItemsAction());
    type === 'builds' && dispatch(getBuildsAction());
  }, [dispatch, authStatus, type]);

  if (authStatus === 'noauth') navigate(AppRoute.Main);

  if (isLoading || !collection.length) return <Loader />;

  if (!id || isNaN(+id)) return <EmptyPage>Wrong ID</EmptyPage>;

  const target = collection.find((item) => item.id === +id);

  if (collection.length && !target) {
    return <EmptyPage>{type === 'items' ? 'Item' : 'Build'} not found </EmptyPage>;
  }

  return <>{type === 'items' ? <NewItem item={target as Item} /> : <CreateBuild build={target as Build} />}</>;
}
