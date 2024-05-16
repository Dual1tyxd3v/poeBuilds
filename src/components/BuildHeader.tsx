import styled from 'styled-components';
import Header from '../ui/CardHeader';

type BuildHeaderProps = {
  name: string;
  pob: string;
};

const Title = styled.h3`
  font-size: 2.4rem;
`;

const Link = styled.a`
  display: block;
  font-size: 1.5rem;
  padding: 0.3rem 0;
  color: inherit;
  transition: transform 0.2s ease, color 0.2s ease;

  &:hover {
    transform: scaleX(1.1);
    color: var(--color-text--active);
  }
`;

export default function BuildHeader({ name, pob }: BuildHeaderProps) {
  return (
    <Header type="unique">
      <Title>{name}</Title>
      <Link href={`pob://${pob}`}>{pob}</Link>
    </Header>
  );
}
