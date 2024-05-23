import { NavLink } from 'react-router-dom';
import { AppRoute } from '../config';
import { Build } from '../types';
import styled from 'styled-components';
import Controls from './Controls';
import { useCallback, useState } from 'react';
import { deleteBuild } from '../api';
import Loader from './Loader';
import Message from './Message';

type NavTabProps = {
  build: Build;
};

const A = styled(NavLink)`
  display: block;
  color: var(--color-text--primary);
  text-align: center;
  font-family: 'Fontin';
  padding: 0.5rem 0;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--color-bg--hover);
  }

  &.active {
    background-color: var(--color-bg--active);
  }
`;

const Li = styled.li`
  position: relative;
  & div[data-id='controls'] {
    clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
    transition: clip-path 0.3s ease;
  }

  &:hover {
    & div[data-id='controls'] {
      clip-path: polygon(calc(100% - 15px) 0, 100% 0, 100% 100%, calc(100% - 15px) 100%);
    }
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
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onDeleteAction = useCallback(async () => {
    setIsLoading(true);
    const { error } = await deleteBuild(id);
    setIsLoading(false);

    setMessage(error || 'Build successefully deleted');
  }, [id]);

  if (isLoading) return <Loader />;
  return (
    <Li>
      {message && <Message msg={message} clearMessage={() => setMessage('')} />}
      <A to={`${AppRoute.Main}build/${id}`}>
        <Title>{name}</Title>
        <Description>
          Damage: <Value>{damage}</Value> Difficulty: <Value>{difficulty}</Value>
        </Description>
      </A>
      <Controls deleteAction={onDeleteAction} />
    </Li>
  );
}
