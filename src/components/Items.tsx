import styled from 'styled-components';
import { BuildItem, Item as ItemType } from '../types';
import Item from './Item';

type ItemsProps = {
  items: ItemType[];
  buildItems: BuildItem[];
  setActive: (v: null | ItemType) => void;
};

const Container = styled.div`
  flex: 1;
  padding-top: 2rem;
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 5rem));
  grid-template-rows: repeat(6, 5rem);
  grid-gap: 0.5rem;
  grid-template-areas:
    'weapon1 weapon1 . helmet helmet . weapon2 weapon2'
    'weapon1 weapon1 . helmet helmet . weapon2 weapon2'
    'weapon1 weapon1 . body body amulet weapon2 weapon2'
    'weapon1 weapon1 ring1 body body ring2 weapon2 weapon2'
    '. gloves gloves body body boots boots .'
    '. gloves gloves belt belt boots boots .';
  justify-content: center;
`;

export default function Items({ items, buildItems, setActive }: ItemsProps) {
  return (
    <Container>
      {buildItems.map(({ id, slot }, i) => (
        <Item setActive={setActive} key={`${i}_${id}`} slot={slot} item={items.filter((item) => item.id === id)[0]} />
      ))}
    </Container>
  );
}
