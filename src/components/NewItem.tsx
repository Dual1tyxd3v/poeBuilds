import styled from 'styled-components';
import { ChangeEvent, useCallback, useState } from 'react';
import { NewItemType } from '../types';
import ItemTemplate from './ItemTemplate';
import ItemInfo from './ItemInfo';

const Form = styled.form`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10rem;
`;

export default function NewItem() {
  const [formData, setFormData] = useState<NewItemType>({
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
  });

  const onChangeHandler = useCallback(
    (e: ChangeEvent) => {
      const input = e.target as HTMLInputElement | HTMLSelectElement;

      setFormData({ ...formData, [`${input.dataset.id}`]: input.value });
    },
    [formData]
  );

  return (
    <>
      <Form>
        <ItemTemplate formData={formData} onChangeHandler={onChangeHandler} />
        <ItemInfo formData={formData} onChangeHandler={onChangeHandler} />
      </Form>
    </>
  );
}
