import styled from 'styled-components';
import { Item } from '../types';
import ItemsContainer from '../ui/ItemsContainer';
import { TEMPLATE_SLOTS } from '../config';
import Slot from '../ui/Slot';
import { MouseEvent, useState } from 'react';
import { getImageById, getTotalDifficulty } from '../utils';
import ActiveCard from './ActiveCard';
import BuildStats from './BuildStats';

type CreateBuildProps = {
  items: Item[];
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

const ListItem = styled.li`
  cursor: pointer;
  padding: 1rem;
  font-size: 1.6rem;
  color: var(--color-text--primary);

  &:hover {
    background-color: var(--color-bg--hover);
  }
`;

export default function CreateBuild({ items }: CreateBuildProps) {
  const [templateItems, setTemplateItems] = useState(() =>
    TEMPLATE_SLOTS.reduce((a, b) => {
      return { ...a, [b]: 0 };
    }, {})
  );
  const [activeSlot, setActiveSlot] = useState<null | string>(null);
  const [buildStats, setBuildStats] = useState({ name: '', damage: 0, difficulty: 0 });
  const [activeItem, setActiveItem] = useState<null | Item>(null);

  const filteredItems = items.filter((item) => activeSlot?.includes(item.slot));

  function onSlotClickHandler(e: MouseEvent) {
    const slot = (e.currentTarget as HTMLDivElement).dataset.slot as string;
    setActiveSlot(slot);
  }

  function onListItemClickHandler(e: MouseEvent) {
    const id = (e.target as HTMLLIElement).dataset.id || 0;
    const newTemplateItems = { ...templateItems, [activeSlot as string]: +id };
    setTemplateItems(newTemplateItems);

    setActiveSlot(() => null);
    setActiveItem(null);

    setBuildStats(() => ({ ...buildStats, difficulty: getTotalDifficulty(items, Object.values(newTemplateItems)) }));
  }
  return (
    <Wrapper>
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
            onClick={onSlotClickHandler}
            data-slot={slot}
            $slot={slot}
            $isactive={false}
            key={`${i}_${slot}slot`}
          >
            {!!templateItems[slot as keyof typeof templateItems] && (
              <img src={getImageById(templateItems[slot as keyof typeof templateItems], items)} alt={slot} />
            )}
          </Slot>
        ))}
      </ItemsContainer>
      <BuildStats difficulty={buildStats.difficulty} />
    </Wrapper>
  );
}
