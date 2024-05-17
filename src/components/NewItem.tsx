import styled from 'styled-components';
import { ChangeEvent, useCallback, useState } from 'react';
import Separator from '../ui/Separator';
import Select from '../ui/Select';
import Option from '../ui/Option';
import { SLOTS } from '../config';
import Button from '../ui/Button';
import { NewItemType } from '../types';
import Input from '../ui/NewItemInput';
import Field from '../ui/NewItemField';
import Label from '../ui/NewItemLabel';
import ItemTemplate from './ItemTemplate';

const Form = styled.form`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10rem;
`;

const FieldInfo = styled(Field)`
  gap: 0.5rem;
  flex-direction: column;
  width: 100%;
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-direction: column;
  background: url(/images/login-bg.png) center center no-repeat;
  background-size: 100% 100%;
  padding: 2rem;
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
        <ItemInfo>
          <Field>
            <Label>Type</Label>
            <Select data-id="rarity" value={formData.rarity} onChange={onChangeHandler}>
              <Option value="unique">Unique</Option>
              <Option value="rare">Rare</Option>
            </Select>
          </Field>
          <Separator type={formData.rarity} />
          <Field>
            <Label>Slot</Label>
            <Select data-id="slot" value={formData.slot} onChange={onChangeHandler}>
              {SLOTS.map((slot, i) => (
                <Option key={`${i}_${slot}`}>{slot}</Option>
              ))}
            </Select>
          </Field>
          <Separator type={formData.rarity} />
          <FieldInfo>
            <Label htmlFor="image">Image url</Label>
            <Input value={formData.image} data-id="image" id="image" type="text" onChange={onChangeHandler} required />
          </FieldInfo>
          <Separator type={formData.rarity} />
          <FieldInfo>
            <Label htmlFor="trade">Trade url</Label>
            <Input
              value={formData.tradeUrl}
              data-id="tradeUrl"
              id="trade"
              type="text"
              onChange={onChangeHandler}
              required
            />
          </FieldInfo>
          <Separator type={formData.rarity} />
          <FieldInfo>
            <Label htmlFor="source">Source</Label>
            <Input
              value={formData.source}
              data-id="source"
              id="source"
              type="text"
              onChange={onChangeHandler}
              required
            />
          </FieldInfo>
          <Separator type={formData.rarity} />
          <FieldInfo style={{ marginBottom: '1rem' }}>
            <Label htmlFor="difficulty">Difficulty</Label>
            <Input
              value={formData.difficulty}
              data-id="difficulty"
              id="difficulty"
              type="number"
              onChange={onChangeHandler}
              max="2"
              min="0"
            />
          </FieldInfo>
          <Button>Add item</Button>
        </ItemInfo>
      </Form>
    </>
  );
}
