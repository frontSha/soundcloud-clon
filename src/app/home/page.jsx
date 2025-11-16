'use client'

import { useContext, useEffect, useState } from 'react'
import { fetchData } from '@/utils/api';
import { PlayerTracksContext } from '@/context/PlayerTracksContext';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import TrackCard from '@/components/domain/TrackCard';

export default function page() {
  const {setTracks} = useContext(PlayerTracksContext);
  const [homeTracks, setHomeTracks] = useState([]);

  useEffect(() => {
    (async () => {
      const tracks = await fetchData('/tracks?q=esoteric&access=playable&limit=5&linked_partitioning=true');
      // setHomeTracks(tracks?.collection);
    })();
  }, [])

  console.log(homeTracks);

  return (
    <div>
      <Header />
      <main className="md:flex md:max-w-[1240px] mx-auto md:max-lg:w-[960px] md:max-xl:w-[1080px]">
        <div className="content md:grow md:pt-12 md:pr-16">
          <div>
            {HomeTracks &&
              HomeTracks.map((track) => (
                <TrackCard
                  key={track.id}
                  trackImg={track.artwork_url}
                  trackName={track.title}
                  username={track.user.username}
                  releaseDate={track.created_at}
                  tag={track.genre}
                  streamCount={track.playback_count}
                  likeCount={track.favoritings_count}
                  track={track}
                />
              ))}
          </div>
        </div>
        <Sidebar></Sidebar>
      </main>
    </div>
  );
}
