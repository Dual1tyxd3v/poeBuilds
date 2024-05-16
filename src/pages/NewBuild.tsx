import { useNavigate } from 'react-router-dom';
import { useMyContext } from '../hooks/useMyContext';
import { AppRoute } from '../config';
import Loader from '../components/Loader';

export default function NewBuild() {
  const { auth } = useMyContext();
  const navigate = useNavigate();

  if (auth === 'unknown') return <Loader />;
  if (auth === 'noauth') navigate(AppRoute.Main);
  return <p>new build</p>;
}
