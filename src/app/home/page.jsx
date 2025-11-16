'use client'

import { useEffect, useState } from 'react'
import { fetchData } from '@/utils/api';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import CarouselSection from '@/components/feature/CarouselSection';

export default function page() {
  const [collections, setCollections] = useState([]);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    (async () => {
      const collections = await fetchData(
        '/playlists?q=buzzing&access=playable&show_tracks=true&limit=8&offset=0&linked_partitioning=true'
      );
      setCollections(collections?.collection);
      const trending = await fetchData(
        '/playlists?q=trending&access=playable&show_tracks=true&limit=8&offset=0&linked_partitioning=true'
      );
      setTrending(trending?.collection);
    })();
  }, [])

  console.log(trending);

  const sections = [
    {
      title: 'Artistas a tener en cuenta',
      id: 'section-recommended',
      collection: collections,
    },
    {
      title: 'Colecciones para ti',
      id: 'section-trending',
      collection: trending,
    },
  ];

  return (
    <div>
      <Header />
      <main className="desktop-container md:flex">
        <div className="content md:grow md:pt-12 md:pr-16">
          <div>
            {
              sections.map((section, i) => (
                <CarouselSection 
                  key={`section-${i + 1}`}
                  sectionId={section.id}
                  sectionTitle={section.title}
                  collection={section.collection}
                />
              ))
            }
          </div>
        </div>
        <Sidebar></Sidebar>
      </main>
    </div>
  );
}
