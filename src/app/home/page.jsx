'use client'

import { useContext, useEffect } from 'react'
import { fetchData } from '@/utils/api';
import { PlayerTracksContext } from '@/context/PlayerTracksContext';
import Search from '@/components/domain/Search';

export default function page() {
  const {setTracks} = useContext(PlayerTracksContext);

  useEffect(() => {
    (async () => {
      const tracks = await fetchData('/tracks?q=esoteric&access=playable&limit=5&linked_partitioning=true');
      setTracks(tracks?.collection);
    })();
  }, [])

  return (
    <div>
      <Search />
    </div>
  )
}
