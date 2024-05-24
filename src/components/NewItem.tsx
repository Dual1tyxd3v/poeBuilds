import styled from 'styled-components';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { NewItemType } from '../types';
import ItemTemplate from './ItemTemplate';
import ItemInfo from './ItemInfo';
import { createNewItem } from '../utils';
import { useAppDispatch } from '../store';
import { createItemAction, getItemsAction } from '../store/async-actions';
import Input from '../ui/NewItemInput';
import ButtonPrimary from '../ui/ButtonPrimary';

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
    const { payload } = await dispatch(createItemAction(newItem));
    const { isSuccess } = payload as { isSuccess: boolean; error: string };

    if (isSuccess) {
      setFormData(initFormState);
      dispatch(getItemsAction());
    }
  }

  return (
    <Form onSubmit={onSubmitHandler}>
      <Wrapper>
        <ItemTemplate formData={formData} onChangeHandler={onChangeHandler} />
        <ItemInfo formData={formData} onChangeHandler={onChangeHandler} />
      </Wrapper>
      {formData.rarity === 'unique' && (
        <Parser>
          <Title>Or you can insert poewiki url with necessary unique item</Title>
          <Field>
            <Input type="text" />
            <ButtonPrimary><span>Parse</span></ButtonPrimary>
          </Field>
        </Parser>
      )}
    </Form>
  );
}
