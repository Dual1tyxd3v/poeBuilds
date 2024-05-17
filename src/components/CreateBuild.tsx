import styled from 'styled-components';
import { Item } from '../types';
import ItemsContainer from '../ui/ItemsContainer';
import { TEMPLATE_SLOTS } from '../config';
import Slot from '../ui/Slot';
import { MouseEvent, useState } from 'react';
import { getImageById, getTotalDifficulty } from '../utils';
import FormFieldColumn from '../ui/FormFieldColumn';
import Label from '../ui/NewItemLabel';
import Field from '../ui/NewItemField';
import Separator from '../ui/Separator';
import Input from '../ui/NewItemInput';
import Button from '../ui/Button';

type CreateBuildProps = {
  items: Item[];
};

const Wrapper = styled.form`
  display: flex;
  justify-content: center;
  flex: 1;
`;

const ItemsListContainer = styled.div`
  width: 30rem;
  overflow: hidden;
`;

const ItemsList = styled.ul`
  height: 100%;
  border-right: 2px solid var(--color-border);
`;

const ListItem = styled.li`
  cursor: pointer;
  padding: 1rem;
  font-size: 1.6rem;
  color: var(--color-text--primary);

  &:hover {
    background-color: var(--color-bg--hover);
  }
`;

const BuildStats = styled.div`
  background: url(/images/login-bg.png) no-repeat;
  background-size: 100% 100%;
  padding: 2rem;
  width: 30rem;
  font-family: 'FontinCard';
`;

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

export default function CreateBuild({ items }: CreateBuildProps) {
  const [templateItems, setTemplateItems] = useState(() =>
    TEMPLATE_SLOTS.reduce((a, b) => {
      return { ...a, [b]: 0 };
    }, {})
  );
  const [activeSlot, setActiveSlot] = useState<null | string>(null);
  const [buildStats, setBuildStats] = useState({ name: '', damage: 0, difficulty: 0 });

  const filteredItems = items.filter((item) => activeSlot?.includes(item.slot));

  function onSlotClickHandler(e: MouseEvent) {
    const slot = (e.currentTarget as HTMLDivElement).dataset.slot as string;
    setActiveSlot(slot);
  }

  function onListItemClickHandler(e: MouseEvent) {
    const id = (e.target as HTMLLIElement).dataset.id || 0;
    const newTemplateItems = { ...templateItems, [activeSlot as string]: +id };
    setTemplateItems(newTemplateItems);
    
    setActiveSlot(() => null);

    setBuildStats(() => ({ ...buildStats, difficulty: getTotalDifficulty(items, Object.values(newTemplateItems)) }));
  }
  return (
    <Wrapper>
      <ItemsListContainer>
        {activeSlot && filteredItems.length && (
          <ItemsList>
            {filteredItems.map(({ id, stats }, i) => (
              <ListItem onClick={onListItemClickHandler} data-id={id} key={`${i}_list_${id}`}>
                {stats.name.join(' ')}
              </ListItem>
            ))}
          </ItemsList>
        )}
      </ItemsListContainer>
      <ItemsContainer>
        {TEMPLATE_SLOTS.map((slot, i) => (
          <Slot onClick={onSlotClickHandler} data-slot={slot} $slot={slot} $isactive={false} key={`${i}_${slot}slot`}>
            {!!templateItems[slot as keyof typeof templateItems] && (
              <img src={getImageById(templateItems[slot as keyof typeof templateItems], items)} alt={slot} />
            )}
          </Slot>
        ))}
      </ItemsContainer>
      <BuildStats>
        <Title>Build stats</Title>
        <Field style={{ justifyContent: 'flex-start' }}>
          <Label>Total difficulty</Label>
          <Difficulty> {buildStats.difficulty}</Difficulty>
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
      </BuildStats>
    </Wrapper>
  );
}
