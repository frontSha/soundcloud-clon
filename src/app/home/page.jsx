'use client'

import { useContext, useEffect } from 'react'
import { fetchData } from '@/utils/api';
import { PlayerTracksContext } from '@/context/PlayerTracksContext';
import Search from '@/components/domain/Search';
import Header from '@/components/layout/Header';

export default function page() {
  const {setTracks} = useContext(PlayerTracksContext);

  // useEffect(() => {
  //   (async () => {
  //     const tracks = await fetchData('/tracks?q=esoteric&access=playable&limit=5&linked_partitioning=true');
  //     setTracks(tracks?.collection);
  //   })();
  // }, [])

  return (
    <div>
      <Header />
    </div>
  )
}
