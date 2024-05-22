import styled from 'styled-components';
import { getTotalDifficulty } from '../utils';
import { Item, NewBuildFormData, TemplateItems } from '../types';
import { MouseEvent } from 'react';

const ItemsListContainer = styled.div`
  width: 30rem;
  overflow: hidden;
`;

const ItemList = styled.ul`
  height: 100%;
  border-right: 2px solid var(--color-border);
`;

type ListItemProps = {
  $isactive: boolean;
};

const ListItem = styled.li<ListItemProps>`
  cursor: pointer;
  padding: 1rem;
  font-size: 1.6rem;
  color: var(--color-text--primary);
  background-color: ${(props) => (props.$isactive ? 'var(--color-bg--active)' : 'transparent')};

  &:hover {
    background-color: ${(props) => (props.$isactive ? 'var(--color-bg--active)' : 'var(--color-bg--hover)')};
  }
`;

type ItemListProps = {
  items: Item[];
  activeSlot: null | string;
  changeFormData: (v: NewBuildFormData) => void;
  changeTemplateItems: (v: TemplateItems) => void;
  changeActiveSlot: (v: null | string) => void;
  changeActiveItem: (v: null | Item) => void;
  formData: NewBuildFormData;
  templateItems: TemplateItems;
};

export default function ItemsList({
  items,
  formData,
  activeSlot,
  templateItems,
  changeFormData,
  changeTemplateItems,
  changeActiveSlot,
  changeActiveItem,
}: ItemListProps) {
  const filteredItems = items.filter((item) => activeSlot?.includes(item.slot));

  function onListItemClickHandler(e: MouseEvent) {
    const id = (e.target as HTMLLIElement).dataset.id || 0;
    const newTemplateItems = { ...templateItems, [activeSlot as string]: +id };
    changeTemplateItems(newTemplateItems);

    changeActiveSlot(null);
    changeActiveItem(null);

    changeFormData({ ...formData, difficulty: getTotalDifficulty(items, Object.values(newTemplateItems)) });
  }
  return (
    <ItemsListContainer>
      {activeSlot && filteredItems.length && (
        <ItemList>
          {filteredItems.map((item, i) => (
            <ListItem
              onMouseEnter={() => changeActiveItem(item)}
              onMouseLeave={() => {
                changeActiveItem(null);
              }}
              onClick={onListItemClickHandler}
              data-id={item.id}
              key={`${i}_list_${item.id}`}
              $isactive={item.id === templateItems[activeSlot as keyof typeof templateItems]}
            >
              {item.stats.name.join(' ')}
            </ListItem>
          ))}
        </ItemList>
      )}
    </ItemsListContainer>
  );
}
