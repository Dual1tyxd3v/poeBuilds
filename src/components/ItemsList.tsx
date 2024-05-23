import styled from 'styled-components';
import { getTotalDifficulty, isItemInTemplate } from '../utils';
import { Item, NewBuildFormData, TemplateItems } from '../types';
import { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from 'react';
import Input from '../ui/NewItemInput';
import Controls from './Controls';
import { useAppDispatch } from '../store';
import { deleteItemAction, getItemsAction } from '../store/async-actions';

const ItemsListContainer = styled.div`
  width: 30rem;
  overflow-y: auto;
`;

const ItemList = styled.ul`
  padding-top: 1rem;
  height: 100%;
  border-right: 2px solid var(--color-border);
`;

type ListItemProps = {
  $isactive: boolean;
};

const ListItem = styled.li<ListItemProps>`
  cursor: pointer;
  font-size: 1.6rem;
  color: var(--color-text--primary);
  background-color: ${(props) => (props.$isactive ? 'var(--color-bg--active)' : 'transparent')};
  display: flex;
  position: relative;

  & div[data-id='controls'] {
    clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
    transition: clip-path 0.3s ease;
  }

  &:hover {
    background-color: ${(props) => (props.$isactive ? 'var(--color-bg--active)' : 'var(--color-bg--hover)')};

    & div[data-id='controls'] {
      clip-path: polygon(calc(100% - 15px) 0, 100% 0, 100% 100%, calc(100% - 15px) 100%);
    }
  }
`;

const ItemDescription = styled.div`
  padding: 1rem;
  padding-right: 1.5rem;
  flex: 1;
`;

const Search = styled(Input)`
  margin: 0 auto 1rem !important;
  width: 90%;
  display: block;
`;

const Separator = styled.div`
  width: 90%;
  height: 2px;
  background-color: var(--color-divider);
  margin: 0 auto;
  margin-bottom: 1rem;
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
  const [search, setSearch] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    setSearch('');
  }, [activeSlot]);

  const filteredItems = items.filter(
    (item) => activeSlot?.includes(item.slot) && item.stats.name.join(' ').toLowerCase().includes(search.toLowerCase())
  );

  function onListItemClickHandler(e: MouseEvent) {
    const id = (e.target as HTMLLIElement).dataset.id || 0;
    const newTemplateItems = { ...templateItems, [activeSlot as string]: +id };
    changeTemplateItems(newTemplateItems);

    changeActiveSlot(null);
    changeActiveItem(null);

    changeFormData({ ...formData, difficulty: getTotalDifficulty(items, Object.values(newTemplateItems)) });
  }

  function onChangeHandler(e: ChangeEvent) {
    const { value } = e.target as HTMLInputElement;
    setSearch(value);
  }

  const onDeleteAction = useCallback(
    async (id: number) => {
      const { payload } = await dispatch(deleteItemAction(id));
      const { isSuccess } = payload as { isSuccess: boolean; error: string };

      if (isSuccess) {
        dispatch(getItemsAction());

        const templateKey = isItemInTemplate(id, templateItems);
        templateKey && changeTemplateItems({ ...templateItems, [templateKey]: 0 });
      }
    },
    [dispatch, changeTemplateItems, templateItems]
  );

  return (
    <ItemsListContainer>
      {activeSlot && (
        <ItemList>
          <Search placeholder="Search" value={search} onChange={onChangeHandler} />
          <Separator></Separator>
          {filteredItems.map((item, i) => (
            <ListItem
              key={`item_${i}_${item.id}`}
              $isactive={item.id === templateItems[activeSlot as keyof typeof templateItems]}
            >
              <ItemDescription
                onMouseEnter={() => {
                  changeActiveItem(item);
                }}
                onMouseLeave={() => {
                  changeActiveItem(null);
                }}
                onClick={onListItemClickHandler}
                data-id={item.id}
                key={`${i}_list_${item.id}`}
              >
                {item.stats.name.join(' ')}
              </ItemDescription>
              <Controls deleteAction={() => onDeleteAction(item.id)} />
            </ListItem>
          ))}
        </ItemList>
      )}
    </ItemsListContainer>
  );
}
