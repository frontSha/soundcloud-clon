'use client'

import { useContext, useEffect, useRef, useState } from 'react';
import { PlayButton, ShuffleButton, SkipNextButton, SkipPrevButton, VolumeControl } from '../ui/buttons/IconButton';
import { fetchData, getToken } from '@/utils/api';
import { PlayerTracksContext } from '@/context/PlayerTracksContext';
import Hls from 'hls.js';

export default function AudioPlayer() {
  const {tracks} = useContext(PlayerTracksContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState([]);
  const [index, setIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [stream, setStream] = useState('')
  const musicRef = useRef(new Audio());
  const music = musicRef.current;
  const trackDuration = Math.floor(currentTrack?.duration / 1000);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(50);
  const [prevVolume, setPrevVolume] = useState(50);
  const isMuted = volume === 0;
  const [isShuffled, setIsShuffled] = useState(false);

  const play = () => {
    setIsPlaying(true);
    music.play();
  }

  const pause = () => {
    setIsPlaying(false);
    music.pause();
  }

  const togglePlay = () => isPlaying ? pause() : play();

  useEffect(() => {
    if (Array.isArray(tracks) && tracks.length > 0) {
      setQueue(tracks);
      setCurrentTrack(tracks[0]);
    } else {
      setQueue([]);
      setCurrentTrack(null);
    }
  }, [tracks])

  useEffect(() => {
    if (!queue.length) return;

    setCurrentTrack(queue[index]);
  }, [index, queue])

  useEffect(() => {
    if (!currentTrack) return;

    (async () => {
      try {
        const trackUrn = currentTrack.urn;

        //obtener token de la API
        const token = await getToken();
        //retorna un objeto con urls mp3 de la canción actual
        const streams = await fetchData(
          `/tracks/${encodeURIComponent(trackUrn)}/streams?secret_token=${token}`
        );

        const url =
          streams.hls_aac_160_url ||
          streams.hls_mp3_128_url ||
          streams.http_mp3_128_url;

        // redirección 302 por cambios en la api
        const streamData = await fetch(`${url}`, {
          method: 'HEAD',
          redirect: 'manual',
          headers: {
            Authorization: `OAuth ${token}`,
            Accept: '*/*',
          },
        });

        const streamUrl = streamData.headers.get('Location');

        if (!streamUrl) {
          throw new Error('No se recibió Location en el HEAD redirect');
        }

        setStream(streamUrl);
      } catch (error) {
        console.log('Error al obtener stream url:', error);
      }

    })();

  }, [currentTrack])

  console.log(stream);

  const loadMusic = () => {
    music.src = stream;
  }

  useEffect(() => {
    if (!stream) return;

    music.pause();
    music.currentTime = 0;
    music.src = '';

    if (stream.includes("hls")) {
      if (Hls.isSupported()) {
        const hls = new Hls({
          xhrSetup: (xhr, url) => {
            // esto asegura que cada fragmento lleve el token
            xhr.withCredentials = false;
          },
        });
        hls.loadSource(stream);
        hls.attachMedia(music);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          music.play();
          setIsPlaying(true);
        });

      } else if (music.canPlayType('application/vnd.apple.mpegurl')) {
        loadMusic();
        music.play();
        setIsPlaying(true);
      }
    } else {
      loadMusic();
      music.play();
      setIsPlaying(true);
    }
  }, [stream, music])

  useEffect(() => {
    return () => {
      music.pause();
      music.src = '';
    }
  }, [music])

  // Skip controls
  const goToNextTrack = () => {
    music.pause();
    music.src = '';
    music.currentTime = 0;
    setCurrentTime(0);

    setIndex((i) => (i + 1 < queue.length ? i + 1 : i));
  }

  const goToPrevTrack = () => {
    music.pause();
    music.src = '';
    music.currentTime = 0;
    setCurrentTime(0);

    setIndex((i) => (i - 1 >= 0 ? i - 1 : i));
  }

  // avanzar a la próx canción al terminar la actual
  useEffect(() => {
    if (!queue.length) return;

    music.onended = () => {
      music.pause();
      music.src = '';
      music.currentTime = 0;
      setCurrentTime(0);

      setIndex((i) => (i + 1 < queue.length ? i + 1 : i));
    }

    return () => {
      music.onended = null;
    }
  }, [music, queue.length, queue])

  const formatTime = (duration) => {
    const totalSeconds = Math.floor(duration);
    const mm = Math.floor(totalSeconds / 60);
    const ss = totalSeconds % 60;

    // agregar un 0 a la izquierda si lo necesita 0:00
    const formattedSec = String(ss).padStart(2, '0');

    return `${mm}:${formattedSec}`;
  };
  
  const updateTrackProgress = () => {    
    setCurrentTime(music.currentTime);
  }

  useEffect(() => {
    if (!music) return;

    music.addEventListener('timeupdate', updateTrackProgress);

    return () => {
      music.removeEventListener('timeupdate', updateTrackProgress);
    }
  }, [])

  useEffect(() => {
    if (music) {
      music.volume = volume / 100;
    }

  }, [volume])

  const toggleMute = () => {
    if (!isMuted) {
      // se guarda el volumen actual
      setPrevVolume(volume);
      setVolume(0);
    } else {
      setVolume(prevVolume);
    }
  }

  const shuffle = (queue) => {
    const newQueue = [...queue];
    for (let i = newQueue.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newQueue[i], newQueue[j]] = [newQueue[j], newQueue[i]];
    }
    return newQueue;
  }

  const toggleShuffle = () => {
    if (!isShuffled) {
      const shuffled = shuffle(queue);

      const currentSongIndex = shuffled.indexOf(currentTrack);
      [shuffled[0], shuffled[currentSongIndex]] = [shuffled[currentSongIndex], shuffled[0]];

      setQueue(shuffled);
      setIndex(0);
      setIsShuffled(true);
    } else {
      const newQueue = [...tracks];

      const PrevCurrentIndex = newQueue.indexOf(currentTrack);

      setQueue(newQueue);
      setIndex(PrevCurrentIndex);
      setIsShuffled(false);
    }
  }

  // no renderizar si no hay una lista de tracks
  if (!queue.length || !currentTrack) return null;

  return (
    <div
      aria-roledescription="audio-player"
      className="bg-neutral-dark fixed bottom-0 w-full z-50 max-md:bottom-35 max-md:rounded-full max-md:bg-neutral-dark/80"
    >
      <div className="desktop-container px-8 h-24 w-full max-md:py-2 max-md:h-auto">
        <div className="elements flex items-center h-full max-md:justify-between">
          <div className="play-controls *:mr-8 flex items-center h-full">
            <SkipPrevButton buttonSize={'large'} onClick={goToPrevTrack} />
            <PlayButton
              buttonSize={'large'}
              variant={'primary'}
              onClick={togglePlay}
              played={isPlaying}
            />
            <SkipNextButton buttonSize={'large'} onClick={goToNextTrack} />
          </div>
          <div>
            <ShuffleButton onClick={toggleShuffle} on={isShuffled} />
          </div>
          <div className="timeline flex items-center ml-12 mr-4 w-full h-full max-md:hidden">
            <span className="progress text-heading5 font-semibold flex-none">
              {formatTime(currentTime)}
            </span>
            <div className="progress-bg w-full h-[2.4px] bg-base-light/15 rounded-sm overflow-clip mx-4 grow">
              <div
                className="progress-bar h-full bg-accent"
                style={{ width: `${(currentTime / trackDuration) * 100}%` }}
              ></div>
            </div>
            <span className="duration text-heading5 font-semibold flex-none">
              {formatTime(trackDuration)}
            </span>
          </div>
          <div className="volume-control relative group h-full max-md:hidden">
            <div className="h-full flex items-center">
              <VolumeControl onClick={toggleMute} off={isMuted} />
            </div>
            <div
              aria-roledescription="volume-slider"
              className="hidden group-hover:flex hover:flex absolute left-0 bottom-24 w-20 h-[152px] bg-base border-1 border-base-light/15 rounded-sm cursor-pointer px-9 py-6.5 justify-center items-center"
            >
              <input
                type="range"
                name="slider"
                min={0}
                max={100}
                step={5}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="volume-slider"
                style={{
                  background: `linear-gradient(to right, #fff 0%, #fff ${volume}%, #333 ${volume}%, #333 100%)`,
                }}
              />
            </div>
          </div>
          <div className="nowplaying-details ml-12">
            <a href="#" className="flex items-center h-full">
              <img
                src={currentTrack && currentTrack.artwork_url}
                alt="Imagen de la canción"
                className="w-16 h-16 mr-8 shrink-0"
              />
              <div className="mr-17 w-[136px]">
                <p className="text-heading5 font-semibold text-neutral-light">
                  {currentTrack && currentTrack.user.username}
                </p>
                <p className="text-heading5 font-semibold text-base-light truncate">
                  {currentTrack && currentTrack.title}
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
