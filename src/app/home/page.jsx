'use client'

import { useContext, useEffect, useState } from 'react'
import { fetchData } from '@/utils/api';
import AudioPlayer from '@/components/domain/AudioPlayer';
import { PlayerTracksContext } from '@/context/PlayerTracksContext';

export default function page() {
  const {setTracks} = useContext(PlayerTracksContext);

  useEffect(() => {
    (async () => {
      const tracks = await fetchData('/tracks?q=esoteric&access=playable&limit=5&linked_partitioning=true');
      setTracks(tracks?.collection);
    })();
  }, [])

  return (
    <div>page</div>
  )
}
