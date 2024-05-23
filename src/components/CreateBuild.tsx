import styled from 'styled-components';
import { BuildItem, Item, NewBuildFormData, TemplateItems } from '../types';
import ItemsContainer from '../ui/ItemsContainer';
import { TEMPLATE_SLOTS } from '../config';
import Slot from '../ui/Slot';
import { FormEvent, MouseEvent, useCallback, useState } from 'react';
import { getImageById, hasAllItems } from '../utils';
import ActiveCard from './ActiveCard';
import BuildStats from './BuildStats';
import Message from './Message';
import { createBuild } from '../api';
import Loader from './Loader';
import ItemsList from './ItemsList';

type CreateBuildProps = {
  items: Item[];
  updateData: () => void;
};

const Wrapper = styled.form`
  display: flex;
  justify-content: center;
  flex: 1;
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

  function onSlotClickHandler(e: MouseEvent) {
    const slot = (e.currentTarget as HTMLDivElement).dataset.slot as string;
    setActiveSlot(slot);
  }

  const changeFormData = useCallback((v: NewBuildFormData) => {
    setFormData(() => v);
  }, []);

  const changeTemplateItems = useCallback((v: TemplateItems) => {
    setTemplateItems(v);
  }, []);

  const changeActiveSlot = useCallback((v: null | string) => {
    setActiveSlot(v);
  }, []);

  const changeActiveItem = useCallback((v: null | Item) => {
    setActiveItem(v);
  }, []);

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
      {message && <Message msg={message} />}
      {activeItem && <ActiveCard item={activeItem} />}
      <ItemsList
        items={items}
        activeSlot={activeSlot}
        formData={formData}
        templateItems={templateItems as TemplateItems}
        changeFormData={changeFormData}
        changeActiveItem={changeActiveItem}
        changeActiveSlot={changeActiveSlot}
        changeTemplateItems={changeTemplateItems}
        updateData={updateData}
      />
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
