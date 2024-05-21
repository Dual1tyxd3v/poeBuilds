import styled from 'styled-components';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { NewItemType } from '../types';
import ItemTemplate from './ItemTemplate';
import ItemInfo from './ItemInfo';
import { createNewItem } from '../utils';
import { createItem } from '../api';
import Loader from './Loader';
import Message from './Message';

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
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('Item successefully added');

  const onChangeHandler = useCallback(
    (e: ChangeEvent) => {
      const input = e.target as HTMLInputElement | HTMLSelectElement;

      setFormData({ ...formData, [`${input.dataset.id}`]: input.value });
    },
    [formData]
  );

  async function onSubmitHandler(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    const newItem = createNewItem(formData);
    const { error } = await createItem(newItem);
    setIsLoading(false);

    if (error) {
      setMessage(error);
      return;
    }

    setMessage('Item successefully added');
    setFormData(initFormState);
  }

  if (isLoading) return <Loader />;

  return (
    <Form onSubmit={onSubmitHandler}>
      {message && <Message msg={message} clearMessage={setMessage} />}
      <ItemTemplate formData={formData} onChangeHandler={onChangeHandler} />
      <ItemInfo formData={formData} onChangeHandler={onChangeHandler} />
    </Form>
  );
}
