'use client'

import { useState } from 'react';
import Input from '../ui/Input';
import { useRouter } from 'next/navigation';

export default function Search({ variant = 'default' }) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim();

    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
    }
  }

  return (
    <form onSubmit={handleSearch}>
      <Input
        inputType={'search'}
        inputName={'search'}
        placeholder={
          variant === 'start'
            ? 'Busca artistas, grupos, pistas y podcasts'
            : 'Buscar'
        }
        func={(val) => setQuery(val)}
        searchOnClick={handleSearch}
      />
    </form>
  );
}
