import { FaLongArrowAltLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const MyLink = styled.button`
  position: absolute;
  background-color: transparent;
  border: none;
  cursor: pointer;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text--primary);
  transition: color 0.2s ease, transform 0.2s ease;

  &:hover {
    color: var(--color-text--active);
    transform: translateY(-50%) scaleX(1.2);
  }
`;

export default function BackLink() {
  const navigate = useNavigate();

  return (
    <MyLink onClick={() => navigate(-1)} aria-label="Back to home" title="Back to home">
      <FaLongArrowAltLeft size="3rem" />
    </MyLink>
  );
}
