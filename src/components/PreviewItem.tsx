import styled from 'styled-components';
import { Item } from '../types';
import CardHeader from '../ui/CardHeader';
import Separator from '../ui/Separator';

type PreviewItemProps = {
  item: Item | null;
};

const Container = styled.div`
  width: 30rem;
`;

const Card = styled.div`
  width: 25rem;
  font-family: 'Fontin';
  background-color: #000;
  border: 1px solid var(--color-border);
  margin-bottom: 2rem;
`;

type CardTitleProps = {
  $type: string;
};

const CardTitle = styled.p<CardTitleProps>`
  font-family: 'FontinCard';
  color: var(
    ${(props) => {
      switch (props.$type) {
        case 'unique':
          return '--color-text--unique';
        case 'rare':
          return '--color-text--primary';
        default:
          return '#000';
      }
    }}
  );
`;

const CardContent = styled.div`
  padding: 0.7rem 1.2rem;
  font-size: 1.5rem;
  text-align: center;
`;

const CardLevel = styled.p`
  color: var(--color-text--default);

  & span {
    font-family: 'FontinBold';
    color: #fff;
  }
`;

const CardMod = styled.p`
  color: var(--color-text--mods);
`;

const Info = styled.p`
  font-size: 1.6rem;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  & span {
    color: var(--color-text--active);
    text-transform: capitalize;
  }
`;

export default function PreviewItem({ item }: PreviewItemProps) {
  if (!item) return <Container></Container>;

  const {
    type,
    source,
    difficulty,
    stats: { name, level, implicit, explicit, text },
  } = item;
  return (
    <Container>
      <Card>
        <CardHeader type={type} style={{ fontSize: '1.7rem' }}>
          {name.map((text) => (
            <CardTitle $type={type} key={text}>
              {text}
            </CardTitle>
          ))}
        </CardHeader>
        <CardContent>
          <CardLevel>
            Requires Level <span>{level}</span>
          </CardLevel>
          <Separator type={type} />
          <CardMod>{implicit}</CardMod>
          <Separator type={type} />
          <div>
            {explicit.map((mod, i) => (
              <CardMod key={`${mod}_${i}`}>{mod}</CardMod>
            ))}
          </div>
          {text && (
            <>
              <Separator type={type} />
              <CardTitle $type={type} style={{ fontFamily: 'FontinItalic' }}>
                {text}
              </CardTitle>
            </>
          )}
        </CardContent>
      </Card>
      <Info>
        Drops from <span>{source}</span>
      </Info>
      <Info>
        Difficulty rate <span>{difficulty}</span>
      </Info>
    </Container>
  );
}
