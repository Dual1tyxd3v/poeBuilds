import styled from 'styled-components';
import { BuildItem, Item, NewBuildFormData } from '../types';
import ItemsContainer from '../ui/ItemsContainer';
import { TEMPLATE_SLOTS } from '../config';
import Slot from '../ui/Slot';
import { FormEvent, MouseEvent, useCallback, useState } from 'react';
import { getImageById, getTotalDifficulty, hasAllItems } from '../utils';
import ActiveCard from './ActiveCard';
import BuildStats from './BuildStats';
import Message from './Message';
import { createBuild } from '../api';
import Loader from './Loader';

type CreateBuildProps = {
  items: Item[];
  updateData: () => void;
};

const Wrapper = styled.form`
  display: flex;
  justify-content: center;
  flex: 1;
`;

const ItemsListContainer = styled.div`
  width: 30rem;
  overflow: hidden;
`;

const ItemsList = styled.ul`
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

export default function CreateBuild({ items, updateData }: CreateBuildProps) {
  const [templateItems, setTemplateItems] = useState(() =>
    TEMPLATE_SLOTS.reduce((a, b) => {
      return { ...a, [b]: 0 };
    }, {})
  );
  const [activeSlot, setActiveSlot] = useState<null | string>(null);
  const [activeItem, setActiveItem] = useState<null | Item>(null);
  const [formData, setFormData] = useState({
    name: '',
    pob: '',
    damage: 0,
    difficulty: 0,
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const filteredItems = items.filter((item) => activeSlot?.includes(item.slot));

  function onSlotClickHandler(e: MouseEvent) {
    const slot = (e.currentTarget as HTMLDivElement).dataset.slot as string;
    setActiveSlot(slot);
  }

  const changeFormData = useCallback((v: NewBuildFormData) => {
    setFormData(v);
  }, []);

  function onListItemClickHandler(e: MouseEvent) {
    const id = (e.target as HTMLLIElement).dataset.id || 0;
    const newTemplateItems = { ...templateItems, [activeSlot as string]: +id };
    setTemplateItems(newTemplateItems);

    setActiveSlot(() => null);
    setActiveItem(null);

    setFormData(() => ({ ...formData, difficulty: getTotalDifficulty(items, Object.values(newTemplateItems)) }));
  }

  async function onSubmitHandler(e: FormEvent) {
    e.preventDefault();

    const newItems = Object.entries(templateItems).map((item) => ({ id: item[1] as number, slot: item[0] }));

    if (!hasAllItems(newItems as BuildItem[])) {
      setMessage('Some items are missed');
      return;
    }

    setIsLoading(true);
    const { name, damage, difficulty, pob } = formData;
    const { error } = await createBuild({ name, pob, damage, difficulty, items: newItems });

    if (error) {
      setMessage(error);
      return;
    }

    setMessage('Build successefully added');
    setIsLoading(false);
    updateData();
  }

  if (isLoading) return <Loader />;

  return (
    <Wrapper onSubmit={onSubmitHandler}>
      {message && <Message msg={message} clearMessage={() => setMessage('')} />}
      {activeItem && <ActiveCard item={activeItem} />}
      <ItemsListContainer>
        {activeSlot && filteredItems.length && (
          <ItemsList>
            {filteredItems.map((item, i) => (
              <ListItem
                onMouseEnter={() => setActiveItem(() => item)}
                onMouseLeave={() => {
                  setActiveItem(() => null);
                }}
                onClick={onListItemClickHandler}
                data-id={item.id}
                key={`${i}_list_${item.id}`}
                $isactive={item.id === templateItems[activeSlot as keyof typeof templateItems]}
              >
                {item.stats.name.join(' ')}
              </ListItem>
            ))}
          </ItemsList>
        )}
      </ItemsListContainer>
      <ItemsContainer>
        {TEMPLATE_SLOTS.map((slot, i) => (
          <Slot
            onMouseEnter={() =>
              setActiveItem(items.find((item) => item.id === templateItems[slot as keyof typeof templateItems]) || null)
            }
            onMouseLeave={() => setActiveItem(null)}
            onClick={onSlotClickHandler}
            data-slot={slot}
            $slot={slot}
            $isactive={activeSlot === slot}
            key={`${i}_${slot}slot`}
          >
            {!!templateItems[slot as keyof typeof templateItems] && (
              <img src={getImageById(templateItems[slot as keyof typeof templateItems], items)} alt={slot} />
            )}
          </Slot>
        ))}
      </ItemsContainer>
      <BuildStats formData={formData} changeFormData={changeFormData} />
    </Wrapper>
  );
}
