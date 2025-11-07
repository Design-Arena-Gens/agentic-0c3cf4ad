import { useEffect, useMemo, useState } from 'react';
import { database } from '../firebase';

export const useRealtimeList = (path, mapFn = (value, key) => ({ id: key, ...value })) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ref = database.ref(path);

    const handleValue = (snapshot) => {
      const value = snapshot.val() || {};
      const mapped = Object.entries(value).map(([key, payload]) => mapFn(payload, key));
      setData(mapped.reverse());
      setLoading(false);
    };

    ref.on('value', handleValue);

    return () => {
      ref.off('value', handleValue);
    };
  }, [path, mapFn]);

  return useMemo(
    () => ({
      data,
      loading
    }),
    [data, loading]
  );
};
