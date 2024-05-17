import { ChangeEvent } from 'react';
import Header from '../ui/CardHeader';
import styled from 'styled-components';
import Input from '../ui/NewItemInput';
import Separator from '../ui/Separator';
import Field from '../ui/NewItemField';
import Label from '../ui/NewItemLabel';
import { NewItemType } from '../types';

type ItemTemplateProps = {
  formData: NewItemType;
  onChangeHandler: (e: ChangeEvent) => void;
};

const ItemContainer = styled.div`
  width: 35rem;
  border: 2px solid var(--color-border);
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

const Container = styled.div`
  background-color: #000;
  padding: 1rem 1.5rem;
`;

export default function ItemTemplate({ formData, onChangeHandler }: ItemTemplateProps) {
  const { name, rarity, type, level, description, implicit, explicit } = formData;
  return (
    <ItemContainer>
      <Header type={rarity}>
        <Input
          style={{ width: '30rem' }}
          placeholder="Name"
          value={name}
          data-id="name"
          type="text"
          onChange={onChangeHandler}
          required
        />
        <Input
          style={{ width: '30rem' }}
          placeholder="Type"
          value={type}
          data-id="type"
          type="text"
          onChange={onChangeHandler}
          required
        />
      </Header>
      <Container>
        <Field>
          <Label htmlFor="level">Requires level</Label>
          <Input
            style={{ width: '5rem' }}
            value={level}
            data-id="level"
            type="number"
            id="level"
            onChange={onChangeHandler}
            max="100"
          />
        </Field>
        <Separator style={{ margin: '0.5rem 0' }} type={rarity} />
        <Input
          placeholder="Implicit"
          value={implicit}
          data-id="implicit"
          type="text"
          onChange={onChangeHandler}
          required
        />
        <Separator style={{ margin: '0.5rem 0' }} type={rarity} />
        <ExplicitArea
          placeholder="Explicit"
          value={explicit}
          data-id="explicit"
          onChange={onChangeHandler}
          required
        ></ExplicitArea>
        <Separator style={{ margin: '0.5rem 0' }} type={rarity} />
        <ExplicitArea
          placeholder="Description (not required)"
          value={description}
          data-id="description"
          onChange={onChangeHandler}
          style={{ height: '4rem', fontFamily: 'FontinItalic' }}
        ></ExplicitArea>
      </Container>
    </ItemContainer>
  );
}
