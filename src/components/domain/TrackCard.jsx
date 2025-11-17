import { IoMdHeart, IoMdMore, IoMdPlay } from "react-icons/io";
import { AddToQueueButton, PlayButton } from "../ui/buttons/IconButton";
import Stats from "../ui/Stats";
import { formatQuantities, timeAgo } from "@/utils/miscellaneous";
import { useContext } from "react";
import { PlayerTracksContext } from "@/context/PlayerTracksContext";
import Tooltip from "../ui/Tooltip";
import Popover from "../ui/Popover";
import { getToken } from "@/utils/api";

export default function TrackCard({trackName, username, trackImg, releaseDate, tag, streamCount, likeCount, type, track}) {
  const {setTracks} = useContext(PlayerTracksContext);

  const handlePlay = () => {
    if (track) {
      setTracks([track]);
    }
  };

  const addToQueue = () => {
    setTracks((prev) => [...prev, track]);
  };

  // FIX
  const handleListPlay = async () => {
      const tracks = await getTracksFromList();
      setTracks(tracks);
    }
  
  const addListToQueue = async () => {
    const tracks = await getTracksFromList();
    setTracks(prev => [...prev, tracks]);
  }
  
  const getTracksFromList = async () => {
    const token = await getToken();

    const res = await fetch(
      `https://api.soundcloud.com/playlists/${encodeURIComponent(playlist.urn)}/tracks`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'application/json; charset=utf-8',
        },
      }
    );

    const data = await res.json();
    return data;
  }

  return (
    <div
      aria-label={`${trackName} de ${username}`}
      className="max-md:cursor-pointer"
    >
      <div id="sound-body" className="md:py-4 md:pl-8 flex">
        <div
          id="artwork"
          className="w-52 h-52 md:w-60 md:h-60 mr-6 md:mr-4 rounded-[3%] overflow-clip bg-linear-135 from-mist to-mauve"
          onClick={type === 'playlist' ? handleListPlay : handlePlay} //para mobile
        >
          {trackImg && (
            <img
              src={trackImg}
              alt={`Cover de ${trackName}`}
              className="max-w-full aspect-square object-cover w-full h-auto"
            />
          )}
        </div>
        <div
          id="content"
          className="flex-1 max-md:self-center max-md:flex max-md:justify-between max-md:items-center"
        >
          <div className="md:flex md:flex-col md:justify-between md:h-full">
            <div id="header" className="md:flex md:px-8 md:mb-6">
              <div className="hidden md:block w-20 h-20 mr-6">
                <PlayButton
                  iconSize={24}
                  buttonSize={'large'}
                  variant={'primary'}
                  onClick={type === 'playlist' ? handleListPlay : handlePlay}
                />
              </div>
              <div className="flex flex-col flex-1">
                <h2 className="md:order-2 text-base-light hover:text-base-light/40 font-bold uppercase md:text-heading4 md:font-semibold">
                  {trackName}{' '}
                  <span className="text-neutral-light hover:text-neutral-light/40 font-semibold lowercase">
                    {'\u00A0\u00B7 '} {type}
                  </span>
                </h2>
                <span className="md:order-1 text-neutral-light hover:text-neutral-light/40 font-700 md:text-heading4 md:font-semibold">
                  {username}
                </span>
              </div>
              <div className="hidden md:flex ml-6 flex-col items-end">
                <span className="text-captions text-neutral-light mb-4">
                  {timeAgo(releaseDate)}
                </span>
                {tag && (
                  <div className="py-1 px-4 rounded-[100px] bg-neutral-dark">
                    <span className="text-base-light font-normal mr-1.5">
                      #
                    </span>
                    <span className="text-base-light font-normal">{tag}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="hidden md:flex justify-between px-8">
              <Tooltip text="Agregar a la fila">
                <AddToQueueButton
                  onClick={type === 'playlist' ? addListToQueue : addToQueue}
                />
              </Tooltip>
              <div className="flex justify-end items-center gap-4">
                {streamCount && (
                  <Stats
                    stat={'reproducciones'}
                    statCount={formatQuantities(streamCount)}
                    icon={<IoMdPlay size={16} />}
                  />
                )}
                <Stats
                  stat={'me gustas'}
                  statCount={formatQuantities(likeCount)}
                  icon={<IoMdHeart size={16} />}
                />
              </div>
            </div>
            <div className="md:hidden flex items-center gap-2 mt-2">
              {streamCount && (
                <Stats
                  stat={'reproducciones'}
                  statCount={formatQuantities(streamCount)}
                  icon={<IoMdPlay size={16} />}
                />
              )}
              <span aria-hidden="true" className="text-neutral-light">
                {'\u00B7'}
              </span>
              <span className="text-captions text-neutral-light">
                {timeAgo(releaseDate)}
              </span>
            </div>
          </div>
          <div className="md:hidden relative">
            <Popover icon={<IoMdMore size={20} />} label={'Ver más'}>
              <AddToQueueButton
                buttonSize={'small'}
                variant={'tertiary'}
                text={'Agregar a la fila'}
                onClick={type === 'playlist' ? addListToQueue : addToQueue}
              />
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
}
