
'use client';
import { useState, useEffect } from 'react';
import { onSnapshot, Query, DocumentData } from 'firebase/firestore';
import { WithId } from '@/lib/types';

export function useStream<T>(queryFactory: Query<T, DocumentData> | null) {
  const [data, setData] = useState<WithId<T>[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!queryFactory) {
      setData([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = onSnapshot(queryFactory, (snapshot) => {
      const results: WithId<T>[] = [];
      snapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setData(results);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching stream:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [queryFactory]);

  return { data, loading };
}
