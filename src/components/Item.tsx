import styled from 'styled-components';
import { Item as ItemType } from '../types';

type SlotProps = {
  slot: string;
};

const Slot = styled.div<SlotProps>`
  border-radius: 5px;
  box-shadow: inset 0 0 12px #0009;
  grid-area: ${(props) => props.slot};
  background-color: rgb(15, 23, 42);
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

type ItemProps = {
  slot: string;
  item: ItemType;
};

export default function Item({ slot, item }: ItemProps) {
  const { img, name } = item;
  return (
    <Slot slot={slot}>
      <img src={img} alt={name} />
    </Slot>
  );
}
