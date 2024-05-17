import { BuildItem, Item as ItemType } from '../types';
import Item from './Item';
import ItemsContainer from '../ui/ItemsContainer';

type ItemsProps = {
  items: ItemType[];
  buildItems: BuildItem[];
  setActive: (v: null | ItemType) => void;
  activeId: null | number;
};

export default function Items({ items, buildItems, setActive, activeId }: ItemsProps) {
  return (
    <ItemsContainer>
      {buildItems.map(({ id, slot }, i) => (
        <Item
          isActive={id === activeId}
          setActive={setActive}
          key={`${i}_${id}`}
          slot={slot}
          item={items.filter((item) => item.id === id)[0]}
        />
      ))}
    </ItemsContainer>
  );
}
