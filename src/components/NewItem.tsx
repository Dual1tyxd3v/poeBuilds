import styled from 'styled-components';
import Header from '../ui/CardHeader';
import { ChangeEvent, useState } from 'react';
import Separator from '../ui/Separator';
import Select from '../ui/Select';
import Option from '../ui/Option';
import { SLOTS } from '../config';
import Button from '../ui/Button';

const ItemTemplate = styled.div`
  width: 35rem;
  border: 2px solid var(--color-border);
`;

const Form = styled.form`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10rem;
`;

const Input = styled.input`
  outline: none;
  background-color: var(--color-slot);
  border: none;
  width: 100%;
  font-size: 1.4rem;
  padding: 0.2rem;
  color: var(--color-text--primary);
  text-align: center;

  &:placeholder-shown {
    color: var(--color-text--default);
  }

  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }

  &:focus {
    background-color: var(--color-bg--active);
    color: #fff;
  }
`;

const Container = styled.div`
  background-color: #000;
  padding: 1rem 1.5rem;
`;

const Field = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const FieldInfo = styled(Field)`
  gap: 0.5rem;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  color: var(--color-text--default);
  font-size: 1.6rem;
  font-family: 'FontinCard';
`;

const ExplicitArea = styled.textarea`
  outline: none;
  background-color: var(--color-slot);
  border: none;
  font-size: 1.4rem;
  padding: 0.2rem;
  color: var(--color-text--primary);
  width: 100%;
  text-align: center;
  resize: none;
  height: 16rem;

  &:placeholder-shown {
    color: var(--color-text--default);
  }

  &:focus {
    background-color: var(--color-bg--active);
    color: #fff;
  }
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
  const [formData, setFormData] = useState({
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

  function onChangeHandler(e: ChangeEvent) {
    const input = e.target as HTMLInputElement | HTMLSelectElement;

    setFormData({ ...formData, [`${input.dataset.id}`]: input.value });
  }
  return (
    <>
      <Form>
        <ItemTemplate>
          <Header type={formData.rarity}>
            <Input
              style={{ width: '30rem' }}
              placeholder="Name"
              value={formData.name}
              data-id="name"
              type="text"
              onChange={onChangeHandler}
            />
            <Input
              style={{ width: '30rem' }}
              placeholder="Type"
              value={formData.type}
              data-id="type"
              type="text"
              onChange={onChangeHandler}
            />
          </Header>
          <Container>
            <Field>
              <Label htmlFor="level">Requires level</Label>
              <Input
                style={{ width: '5rem' }}
                value={formData.level}
                data-id="level"
                type="number"
                id="level"
                onChange={onChangeHandler}
                max="100"
              />
            </Field>
            <Separator style={{ margin: '0.5rem 0' }} type={formData.rarity} />
            <Input
              placeholder="Implicit"
              value={formData.implicit}
              data-id="implicit"
              type="text"
              onChange={onChangeHandler}
            />
            <Separator style={{ margin: '0.5rem 0' }} type={formData.rarity} />
            <ExplicitArea
              placeholder="Explicit"
              value={formData.explicit}
              data-id="explicit"
              onChange={onChangeHandler}
            ></ExplicitArea>
            <Separator style={{ margin: '0.5rem 0' }} type={formData.rarity} />
            <ExplicitArea
              placeholder="Description (not required)"
              value={formData.description}
              data-id="description"
              onChange={onChangeHandler}
              style={{ height: '4rem', fontFamily: 'FontinItalic' }}
            ></ExplicitArea>
          </Container>
        </ItemTemplate>
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
            <Input value={formData.image} data-id="image" id="image" type="text" onChange={onChangeHandler} />
          </FieldInfo>
          <Separator type={formData.rarity} />
          <FieldInfo>
            <Label htmlFor="trade">Trade url</Label>
            <Input value={formData.tradeUrl} data-id="tradeUrl" id="trade" type="text" onChange={onChangeHandler} />
          </FieldInfo>
          <Separator type={formData.rarity} />
          <FieldInfo>
            <Label htmlFor="source">Source</Label>
            <Input value={formData.source} data-id="source" id="source" type="text" onChange={onChangeHandler} />
          </FieldInfo>
          <Separator type={formData.rarity} />
          <FieldInfo style={{marginBottom: '1rem'}}>
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
