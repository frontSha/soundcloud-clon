import React, { useEffect, useState } from 'react'
import Button from '@/components/ui/buttons/Button';
import Image from 'next/image';
import '@/styles/components.css';

export default function HeroCarousel() {
  const [swipeValue, setSwipeValue] = useState(0);

  const slidesDetails = [
    {
      background:
        'https://a-v2.sndcdn.com/assets/images/front-hero-artist-fan-534fb484.jpeg',
      title: 'Descubrir.\nLogra que te descubran.',
      para: 'Descubre tu próxima obsesión, o conviértete en la de otra persona. SoundCloud es la única comunidad en la que fans y artistas se unen para descubrir y conectar a través de la música.',
      buttonText: 'Empezar',
      secondaryButton: null,
      artist: 'DC the Don',
      extra: 'SoundCloud Artist Pro',
    },
    {
      background:
        'https://a-v2.sndcdn.com/assets/images/front-hero-artist-db39c288.jpeg',
      title: 'Todo empieza con \nuna subida.',
      para: 'Desde dormitorios y armarios de escobas hasta estudios y estadios, SoundCloud es el lugar donde defines qué es lo próximo en música. Solo tienes que subirlo.',
      buttonText: 'Subir',
      secondaryButton: 'Explorar Artist Pro',
      artist: '1900Rugrat',
      extra: 'Artista ascendente',
    },
    {
      background:
        'https://a-v2.sndcdn.com/assets/images/front-hero-fan-91fe6e9a.jpeg',
      title: 'Donde vive toda escena musical.',
      para: 'Descubre 400 millones de canciones, remezclas y sesiones de DJ: todas las pistas más populares que puedas encontrar en otro sitio, y millones más que no podrás encontrar en ningún otro lugar.',
      buttonText: 'Subir',
      secondaryButton: "Explorar Go+",
      artist: 'bunii',
      extra: 'Artista ascendente',
    },
  ];

  useEffect(() => {
    setInterval(() => {
      setSwipeValue((val) => val < 2 ? val + 1 : 0)
    }, 5000)
  }, [])

  return (
    <div
      data-theme="light"
      className="h-[450px] mt-16 rounded-2xl overflow-hidden relative"
    >
      <div
        aria-roledescription="carousel"
        className="hero-content h-full transition-transform ease-linear duration-300"
        style={{ transform: `translateX(-${swipeValue * 100}%)` }}
      >
        <div className="h-full w-[300%] flex">
          {slidesDetails.map((slide, i) => (
            <div className="h-full w-[33.33%]" key={`slide-${i + 1}`}>
              <div
                className="bg-no-repeat bg-cover w-full h-full px-16 pt-48 pb-32 flex flex-col justify-between"
                style={{ backgroundImage: `url(${slide.background})` }}
              >
                <div className="slide-content max-w-[560px]">
                  <h2 className="hero-slider-title">{slide.title}</h2>
                  <p className="text-heading3 font-semibold mt-16">
                    {slide.para}
                  </p>
                </div>
                <div className="hero-footer flex justify-between items-center">
                  <div className="flex gap-4">
                    <Button text={slide.buttonText} size="large" />
                    {slide.secondaryButton && (
                      <Button
                        text={slide.secondaryButton}
                        size="large"
                        variant="transparent"
                      />
                    )}
                  </div>
                  <div className="artist-info flex flex-col">
                    <a href="#" className="font-bold hover:underline">
                      {slide.artist}
                    </a>
                    <span>{slide.extra}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="hero-header flex justify-between absolute top-16 right-16 left-16">
        <div className="header-logo flex items-center">
          <Image
            src={'/imgs/soundcloud-logo.png'}
            width={48}
            height={22}
            alt="SoundCloud logo"
          />
          <Image
            src={'/imgs/soundcloud.png'}
            width={115}
            height={22}
            alt="SoundCloud logo"
          />
        </div>
        <div className="header-buttons *:mr-3">
          <Button text={'Inicia sesión'} variant="tertiary" />
          <Button text={'Crea tu cuenta'} variant="primary" />
          <Button text={'Para artistas'} variant="transparent" />
        </div>
      </div>
      <div className="carousel-pagination flex gap-8 absolute bottom-12 left-1/2 -translate-x-1/2">
        {slidesDetails.map((_, i) => (
          <div key={i} onClick={() => setSwipeValue(i)} className="border-2 border-base-light h-8 w-8 rounded-full transition-colors duration-300 cursor-pointer"
            style={{backgroundColor: `${i === swipeValue ? "#fff" : "transparent"}`}}
          ></div>
        ))}
      </div>
    </div>
  );
}
