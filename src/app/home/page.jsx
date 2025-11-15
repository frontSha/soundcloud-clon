'use client'

import { useContext, useEffect } from 'react'
import { fetchData } from '@/utils/api';
import { PlayerTracksContext } from '@/context/PlayerTracksContext';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

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
      <main className="flex max-w-[1240px] mx-auto max-lg:w-[960px] max-xl:w-[1080px]">
        <div className="content grow">
          <h2>No hay nada aquí aún</h2>
        </div>
        <Sidebar></Sidebar>
      </main>
    </div>
  );
}
