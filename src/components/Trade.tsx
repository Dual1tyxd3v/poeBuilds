import styled from 'styled-components';
import { BuildItem, Item } from '../types';
import { CURRENT_LEAGUE } from '../config';

type TradeProps = {
  items: Item[];
  buildItems: BuildItem[];
  setActive: (v: Item | null) => void;
};

const Container = styled.div`
  width: 20rem;
  border-right: 2px solid var(--color-border);
  height: 100%;
`;

const Title = styled.h4`
  font-size: 2rem;
  text-align: center;
  font-family: 'FontinBold';
  padding: 0.5rem;
  border-bottom: 2px solid var(--color-border);
`;

const List = styled.ul`
  padding: 1rem;

  & li:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const Link = styled.a`
  font-size: 1.6rem;
  color: var(--color-text--primary);
  text-transform: capitalize;
  transition: color 0.2s ease;

  &:hover {
    color: var(--color-text--active);
    font-weight: 700;
  }
`;

export default function Trade({ items, buildItems, setActive }: TradeProps) {
  function onHoverHandler(item?: Item) {
    setActive(item ? item : null);
  }
  return (
    <Container>
      <Title>Trade links</Title>
      <List>
        {buildItems.map(({ id, slot }, i) => {
          const item = items.find((item) => item.id === id);
          if (!item) return null;
          return (
            <li key={`${i}_${slot}`}>
              <Link
                onMouseEnter={() => onHoverHandler(item)}
                onMouseLeave={() => onHoverHandler()}
                href={item.tradeUrl.replace('%LEAGUE%', CURRENT_LEAGUE)}
                target="_blank"
              >
                {slot}
              </Link>
            </li>
          );
        })}
      </List>
    </Container>
  );
}
