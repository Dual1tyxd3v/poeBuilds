import styled from 'styled-components';

type BuildHeaderProps = {
  name: string;
  pob: string;
};

const Header = styled.div`
  height: 5.4rem;
  background: url(src/assets/head--left.png) top left no-repeat, url(src/assets/head--right.png) top right no-repeat,
    url(src/assets/head--mid.png) center top repeat-x;
  font-family: 'FontinCard';
  text-align: center;
`;

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
    <Header>
      <Title>{name}</Title>
      <Link href={pob} target="_blank">
        {pob}
      </Link>
    </Header>
  );
}
