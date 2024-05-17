import { ChangeEvent } from 'react';
import { SLOTS } from '../config';
import { NewItemType } from '../types';
import Button from '../ui/Button';
import Field from '../ui/NewItemField';
import Input from '../ui/NewItemInput';
import Label from '../ui/NewItemLabel';
import Option from '../ui/Option';
import Select from '../ui/Select';
import Separator from '../ui/Separator';
import styled from 'styled-components';

type ItemInfoProps = {
  formData: NewItemType;
  onChangeHandler: (e: ChangeEvent) => void;
};

const Container = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-direction: column;
  background: url(/images/login-bg.png) center center no-repeat;
  background-size: 100% 100%;
  padding: 2rem;
`;

const FieldInfo = styled(Field)`
  gap: 0.5rem;
  flex-direction: column;
  width: 100%;
`;

export default function ItemInfo({ formData, onChangeHandler }: ItemInfoProps) {
  const { rarity, slot, image, tradeUrl, source, difficulty } = formData;
  return (
    <Container>
      <Field>
        <Label>Type</Label>
        <Select data-id="rarity" value={rarity} onChange={onChangeHandler}>
          <Option value="unique">Unique</Option>
          <Option value="rare">Rare</Option>
        </Select>
      </Field>
      <Separator type={rarity} />
      <Field>
        <Label>Slot</Label>
        <Select data-id="slot" value={slot} onChange={onChangeHandler}>
          {SLOTS.map((slot, i) => (
            <Option key={`${i}_${slot}`}>{slot}</Option>
          ))}
        </Select>
      </Field>
      <Separator type={rarity} />
      <FieldInfo>
        <Label htmlFor="image">Image url</Label>
        <Input value={image} data-id="image" id="image" type="text" onChange={onChangeHandler} required />
      </FieldInfo>
      <Separator type={rarity} />
      <FieldInfo>
        <Label htmlFor="trade">Trade url</Label>
        <Input value={tradeUrl} data-id="tradeUrl" id="trade" type="text" onChange={onChangeHandler} required />
      </FieldInfo>
      <Separator type={rarity} />
      <FieldInfo>
        <Label htmlFor="source">Source</Label>
        <Input value={source} data-id="source" id="source" type="text" onChange={onChangeHandler} required />
      </FieldInfo>
      <Separator type={rarity} />
      <FieldInfo style={{ marginBottom: '1rem' }}>
        <Label htmlFor="difficulty">Difficulty</Label>
        <Input
          value={difficulty}
          data-id="difficulty"
          id="difficulty"
          type="number"
          onChange={onChangeHandler}
          max="2"
          min="0"
        />
      </FieldInfo>
      <Button>Add item</Button>
    </Container>
  );
}
