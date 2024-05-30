/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { CreateItem, Item, NewItemType, ParseData } from '../types';
import ItemTemplate from './ItemTemplate';
import ItemInfo from './ItemInfo';
import { createItemFormState, createNewItem } from '../utils';
import { useAppDispatch } from '../store';
import { createItemAction, editItemAction, getItemsAction } from '../store/async-actions';
import Input from '../ui/NewItemInput';
import ButtonPrimary from '../ui/ButtonPrimary';
import { parseItem } from '../api';
import { setIsLoading, setMessage } from '../store/reducer';

const Form = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const Wrapper = styled.div`
  gap: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Parser = styled.div`
  background: url(/images/login-bg.png) center center no-repeat;
  background-size: 100% 100%;
  padding: 1rem 2rem;
`;

const Title = styled.h4`
  font-size: 2rem;
  color: var(--color-text--primary);
  text-align: center;
  font-family: 'Fontin';
  margin-bottom: 1rem;
`;

const Field = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const initFormState = {
  id: null,
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

type NewItemProps = {
  item?: Item;
};

export default function NewItem({ item }: NewItemProps) {
  const [formData, setFormData] = useState<NewItemType>(() => (item ? createItemFormState(item) : initFormState));
  const [parseUrl, setParseUrl] = useState('');
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

    const newItem = createNewItem(formData) as CreateItem;
    const { payload } = item
      ? await dispatch(editItemAction({ newItem, id: item.id }))
      : await dispatch(createItemAction(newItem));
    const { isSuccess, data } = payload as { isSuccess: boolean; error: string; data?: Item | undefined };

    if (isSuccess) {
      setFormData(data ? createItemFormState(data) : initFormState);
      dispatch(getItemsAction());
    }
  }

  async function onParserSubmitHandler() {
    if (!parseUrl) return;
    dispatch(setIsLoading(true));

    const { data, error } = await parseItem(parseUrl);

    dispatch(setIsLoading(false));

    if (error || !data) {
      dispatch(setMessage(error));
      return;
    }
    const { name, implicit, explicit, text, level, source, image } = data as ParseData;
    setFormData({
      ...formData,
      implicit,
      level,
      source,
      image,
      description: text,
      name: name[0],
      type: name[1],
      explicit: explicit.join('\n'),
    });
  }

  return (
    <Form onSubmit={onSubmitHandler}>
      <Wrapper>
        <ItemTemplate formData={formData} onChangeHandler={onChangeHandler} />
        <ItemInfo formData={formData} onChangeHandler={onChangeHandler} />
      </Wrapper>
      {formData.rarity === 'unique' && (
        <Parser>
          <Title>Or you can insert poedb url with necessary unique item</Title>
          <Field>
            <Input type="text" value={parseUrl} onChange={(e) => setParseUrl(e.target.value)} placeholder="Poedb URL" />
            <ButtonPrimary onClick={onParserSubmitHandler} type="button">
              <span>Parse</span>
            </ButtonPrimary>
          </Field>
        </Parser>
      )}
    </Form>
  );
}
