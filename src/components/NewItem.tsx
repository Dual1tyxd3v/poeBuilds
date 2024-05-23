import styled from 'styled-components';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { NewItemType } from '../types';
import ItemTemplate from './ItemTemplate';
import ItemInfo from './ItemInfo';
import { createNewItem } from '../utils';
import { useAppDispatch } from '../store';
import { createItemAction } from '../store/async-actions';

const Form = styled.form`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10rem;
`;

const initFormState = {
  name: '',
  type: '',
  level: 1,
  implicit: '',
  rarity: 'unique',
  explicit: '',
  description: '',
  slot: '',
  image: '',
  tradeUrl: '',
  source: '',
  difficulty: 0,
};

export default function NewItem() {
  const [formData, setFormData] = useState<NewItemType>(initFormState);
  const dispatch = useAppDispatch();

  const onChangeHandler = useCallback(
    (e: ChangeEvent) => {
      const input = e.target as HTMLInputElement | HTMLSelectElement;

      setFormData({ ...formData, [`${input.dataset.id}`]: input.value });
    },
    [formData]
  );

  async function onSubmitHandler(e: FormEvent) {
    e.preventDefault();

    const newItem = createNewItem(formData);
    dispatch(createItemAction(newItem));

    setFormData(initFormState);
  }

  return (
    <Form onSubmit={onSubmitHandler}>
      <ItemTemplate formData={formData} onChangeHandler={onChangeHandler} />
      <ItemInfo formData={formData} onChangeHandler={onChangeHandler} />
    </Form>
  );
}
