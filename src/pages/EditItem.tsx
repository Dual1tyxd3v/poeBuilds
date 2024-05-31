import { useSelector } from 'react-redux';
import { getItemsFromState } from '../store/selectors';
import PrepareEditPage from '../components/PrepareEditPage';

export default function EditItem() {
  const items = useSelector(getItemsFromState);

  return <PrepareEditPage collection={items} type="items" />;
}
