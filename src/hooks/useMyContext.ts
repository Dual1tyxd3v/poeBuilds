import { useContext } from 'react';
import { MyContext } from '../App';

export const useMyContext = () => {
  const context = useContext(MyContext);

  if (!context) throw new Error('Context error');

  return context;
};
