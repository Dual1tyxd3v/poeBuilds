import { styled } from 'styled-components';
import Button from '../ui/Button';
import FormFieldColumn from '../ui/FormFieldColumn';
import Field from '../ui/NewItemField';
import Input from '../ui/NewItemInput';
import Label from '../ui/NewItemLabel';
import Separator from '../ui/Separator';

type BuildStatsProps = {
  difficulty: number;
};

const Title = styled.h3`
  font-size: 2.6rem;
  text-align: center;
  color: var(--color-text--primary);
  position: relative;
  padding-bottom: 2rem;
  margin-bottom: 2rem;

  &::after {
    content: '';
    height: 1.2rem;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    background: url(/images/title-border.png) no-repeat;
    background-size: contain;
  }
`;

const Difficulty = styled.span`
  color: #fff;
  font-weight: 600;
  font-size: 1.6rem;
`;

const Container = styled.div`
  background: url(/images/login-bg.png) no-repeat;
  background-size: 100% 100%;
  padding: 2rem;
  width: 30rem;
  font-family: 'FontinCard';
`;

export default function BuildStats({ difficulty }: BuildStatsProps) {
  return (
    <Container>
      <Title>Build stats</Title>
      <Field style={{ justifyContent: 'flex-start' }}>
        <Label>Total difficulty</Label>
        <Difficulty> {difficulty}</Difficulty>
      </Field>
      <Separator style={{ margin: '0.5rem 0' }} type="rare" />
      <FormFieldColumn>
        <Label htmlFor="name">Name</Label>
        <Input id="name" />
      </FormFieldColumn>
      <Separator style={{ margin: '0.5rem 0' }} type="rare" />
      <FormFieldColumn style={{ marginBottom: '4rem' }}>
        <Label htmlFor="damage">Damage</Label>
        <Input type="number" id="damage" min="0" />
      </FormFieldColumn>
      <Button>Add Build</Button>
    </Container>
  );
}
