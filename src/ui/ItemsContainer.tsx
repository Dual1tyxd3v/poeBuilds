import styled from 'styled-components';

const ItemsContainer = styled.div`
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
export default ItemsContainer;
