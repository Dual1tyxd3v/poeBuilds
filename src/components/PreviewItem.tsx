import styled from 'styled-components';
import { Item } from '../types';

type PreviewItemProps = {
  item: Item | null;
};

const Container = styled.div`
  width: 30rem;
`;
export default function PreviewItem({ item }: PreviewItemProps) {
  return <Container>{item && item.name}</Container>;
}
