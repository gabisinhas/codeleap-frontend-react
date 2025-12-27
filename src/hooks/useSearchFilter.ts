import { useState, useMemo } from 'react';


export function useSearchFilter<T>(items: T[], getText: (item: T) => string) {
  const [search, setSearch] = useState('');

  const filteredItems = useMemo(() => {
    if (!search) return items;
    const lower = search.toLowerCase();
    return items.filter(item => getText(item).toLowerCase().includes(lower));
  }, [items, search, getText]);

  return { search, setSearch, filteredItems };
}
