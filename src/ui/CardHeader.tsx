import { styled } from 'styled-components';

type HeaderProps = {
  type: string;
};

const Header = styled.div<HeaderProps>`
  height: 5.4rem;
  background: ${({ type }) => `url(../src/assets/head--${type}-left.png) top left no-repeat,
    url(../src/assets/head--${type}-right.png) top right no-repeat, url(../src/assets/head--${type}-mid.png) center top repeat-x;`};
  font-family: 'FontinCard';
  text-align: center;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Header;
