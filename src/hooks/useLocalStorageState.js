import { useEffect, useState } from 'react';
import { readLocal, writeLocal } from '../utils/storage';

export const useLocalStorageState = (key, initialValue) => {
  const [state, setState] = useState(() => readLocal(key, initialValue));

  useEffect(() => {
    writeLocal(key, state);
  }, [key, state]);

  return [state, setState];
};
