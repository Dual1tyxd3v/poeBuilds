import { NavLink } from 'react-router-dom';
import { AppRoute } from '../config';
import { Build } from '../types';
import styled from 'styled-components';
import Controls from './Controls';

type NavTabProps = {
  build: Build;
};

const A = styled(NavLink)`
  display: block;
  color: var(--color-text--primary);
  text-align: center;
  font-family: 'Fontin';
  padding: 0.5rem 0;
  position: relative;
  transition: background-color 0.2s ease;

  & div[data-id='controls'] {
    clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
    transition: clip-path 0.3s ease;
  }
  &:hover {
    background-color: var(--color-bg--hover);

    & div[data-id='controls'] {
      clip-path: polygon(calc(100% - 15px) 0, 100% 0, 100% 100%, calc(100% - 15px) 100%);
    }
  }

  &.active {
    background-color: var(--color-bg--active);
  }
`;

const Title = styled.p`
  font-size: 2rem;
  text-transform: capitalize;
`;

const Description = styled.p`
  font-size: 1.4rem;
`;

const Value = styled.span`
  color: var(--color-text--mods);
`;

export default function NavTab({ build }: NavTabProps) {
  const { id, name, difficulty, damage } = build;
  return (
    <li>
      <A to={`${AppRoute.Main}build/${id}`}>
        <Title>{name}</Title>
        <Description>
          Damage: <Value>{damage}</Value> Difficulty: <Value>{difficulty}</Value>
        </Description>
        <Controls deleteAction={() => console.log('123')} />
      </A>
    </li>
  );
}
