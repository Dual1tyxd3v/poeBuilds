import { useSelector } from 'react-redux';
import { getItemsFromState, getMessage } from '../store/selectors';
import PrepareEditPage from '../components/PrepareEditPage';
import styled from 'styled-components';
import BackLink from '../components/BackLink';
import Message from '../components/Message';
import Wrapper from '../ui/Wrapper';

const Controls = styled.div`
  position: relative;
  height: 2rem;
`;

export default function EditItem() {
  const items = useSelector(getItemsFromState);
  const message = useSelector(getMessage);

  return (
    <>
      {message && <Message msg={message} />}
      <Controls>
        <BackLink />
      </Controls>
      <Wrapper style={{ height: 'calc(100% - 2rem)', minHeight: '50.6rem', overflow: 'auto' }}>
        <PrepareEditPage collection={items} type="items" />;
      </Wrapper>
    </>
  );
}
