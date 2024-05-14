import { useParams } from 'react-router-dom';

export default function Build() {
  const { id } = useParams();
  return <p>{id} build</p>;
}
