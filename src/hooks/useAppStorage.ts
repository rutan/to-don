import { useCallback, useEffect, useState } from 'react';
import { AppStorageData, appStorageDataSchema } from '../schema';

const STORAGE_KEY = 'to-don::app-storage';

export interface AppStorageState {
  loading: boolean;
  data: AppStorageData;
}

const initialState: AppStorageState = {
  loading: true,
  data: {
    instances: [],
  },
};

export function useAppStorage() {
  const [appStorage, setAppStorage] = useState<AppStorageState>(initialState);

  useEffect(() => {
    const loadData = localStorage.getItem(STORAGE_KEY);
    if (!loadData) {
      setAppStorage({
        ...initialState,
        loading: false,
      });
      return;
    }

    try {
      const data = appStorageDataSchema.parse(JSON.parse(loadData));
      setAppStorage({
        ...initialState,
        loading: false,
        data,
      });
    } catch (e) {
      console.error(e);
      setAppStorage({
        ...initialState,
        loading: false,
      });
    }
  }, []);

  useEffect(() => {
    if (appStorage.loading) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appStorage.data));
  }, [appStorage]);

  return {
    appStorage,
    setAppStorage,
  };
}
