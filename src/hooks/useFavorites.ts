import { useState, useEffect } from 'react';

const KEY = 'vkusnoprosto_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const stored = localStorage.getItem(KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggle = (i: number) => {
    setFavorites((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  };

  const isFav = (i: number) => favorites.includes(i);

  const clear = () => setFavorites([]);

  return { favorites, toggle, isFav, clear, count: favorites.length };
}
