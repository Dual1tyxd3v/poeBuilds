import styled from 'styled-components';
import { BuildItem, Item, NewBuildFormData, TemplateItems } from '../types';
import ItemsContainer from '../ui/ItemsContainer';
import { AppRoute, TEMPLATE_SLOTS } from '../config';
import Slot from '../ui/Slot';
import { FormEvent, MouseEvent, useCallback, useState } from 'react';
import { getImageById, hasAllItems } from '../utils';
import ActiveCard from './ActiveCard';
import BuildStats from './BuildStats';
import ItemsList from './ItemsList';
import { useSelector } from 'react-redux';
import { getItemsFromState } from '../store/selectors';
import { useAppDispatch } from '../store';
import { setMessage } from '../store/reducer';
import { createBuildAction } from '../store/async-actions';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.form`
  display: flex;
  justify-content: center;
  flex: 1;
`;

export default function CreateBuild() {
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
  const items = useSelector(getItemsFromState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
      dispatch(setMessage('Some items are missed'));
      return;
    }

    const { name, damage, difficulty, pob } = formData;
    const { payload } = await dispatch(createBuildAction({ name, pob, damage, difficulty, items: newItems }));

    const { id } = payload as { id: number; error: string };

    if (id) {
      navigate(`${AppRoute.Main}build/${id}`);
    }
  }

  return (
    <Wrapper onSubmit={onSubmitHandler}>
      {activeItem && <ActiveCard item={activeItem} />}
      <ItemsList
        activeSlot={activeSlot}
        formData={formData}
        templateItems={templateItems as TemplateItems}
        changeFormData={changeFormData}
        changeActiveItem={changeActiveItem}
        changeActiveSlot={changeActiveSlot}
        changeTemplateItems={changeTemplateItems}
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
