import styled from 'styled-components';

type SeparatorProps = {
  type: 'unique' | 'rare';
};

const Separator = styled.div<SeparatorProps>`
  height: 3px;
  padding: 0.5rem 0;
  background: url(/images/separator-${(props) => props.type}.png) center center no-repeat;
`;

export default Separator;
