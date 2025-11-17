import { IoMdHeart, IoMdPlay } from "react-icons/io";
import Stats from "./Stats";
import { formatQuantities, timeAgo } from "@/utils/miscellaneous";
import { AddToQueueButton, PlayButton } from "./buttons/IconButton";
import Tooltip from "./Tooltip";
import { useContext } from "react";
import { PlayerTracksContext } from "@/context/PlayerTracksContext";
import { getToken } from "@/utils/api";

export default function Card({
  cardLink,
  artworkURL,
  heading,
  username,
  userLink,
  description,
  releaseDate,
  variant = "default",
  likeCount,
  streamCount,
  buttonIconSize,
  playlist,
}) {

  const inSidebar = variant === "sidebar";
  
  const {setTracks} = useContext(PlayerTracksContext);

  const handlePlay = async () => {
    const tracks = await getTracks();
    setTracks(tracks);
  }

  const addToQueue = async () => {
    const tracks = await getTracks();
    setTracks(prev => [...prev, tracks]);
  }

  const getTracks = async () => {
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
    <div className="group">
      <div
        role="card"
        className={`flex ${
          !inSidebar ? 'flex-col md:mb-24' : 'w-full px-8 py-4'
        }`}
      >
        {/* card artwork */}
        <div
          className={`card-artwork relative cursor-pointer ${
            inSidebar ? 'mr-8 w-24 h-24' : ''
          }`}
        >
          <a href={cardLink} className="artwork-link cursor-pointer">
            <div className="artwork-container max-md:w-80 max-md:h-80 rounded-[3%] overflow-clip max-md:outline-1 max-md:outline-base-light/15">
              <img
                className={`max-w-full aspect-square ${
                  !inSidebar ? 'w-full h-full' : 'w-24 h-24'
                }`}
                src={artworkURL}
                alt={`Cover ${heading}`}
              />
            </div>
          </a>

          <div
            className={`overlay absolute top-0 left-0 w-full h-full z-5 rounded-[3%] opacity-0 ${
              !inSidebar
                ? 'bg-base-light/40 hover:opacity-100 max-md:bg-transparent'
                : 'group-hover:opacity-100'
            }`}
          >
            <div
              className={`buttons w-full h-full grid grid-cols-1`}
            >
              <div className="play-button absolute left-1/2 top-1/2 -translate-1/2">
                <PlayButton
                  buttonSize={'large'}
                  variant={'primary'}
                  iconSize={buttonIconSize}
                  custom={'btn-xxl'}
                  onClick={handlePlay}
                />
              </div>
              {!inSidebar && (
                <div
                  className="action-buttons place-self-end mr-2 mb-1 xl:mr-4 xl:mb-4 lg:mr-0 lg:mb-2"
                  data-theme="light"
                  data-variant="ghost"
                >
                  <Tooltip text={'Agregar a la fila'}>
                    <AddToQueueButton onClick={addToQueue} />
                  </Tooltip>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* card content */}
        <div className="card-content">
          <div
            className={`card-description text-heading4 font-semibold ${
              !inSidebar ? 'mt-4' : 'mb-2 flex flex-col relative'
            }`}
          >
            <a
              href={cardLink}
              className={`text-base-light break-all line-clamp-1 cursor-pointer hover:text-base-light/40 ${
                inSidebar ? 'order-2' : ''
              }`}
            >
              {heading}
            </a>
            <div className="text-neutral-light break-all line-clamp-1">
              {(username && (
                <a
                  href={userLink}
                  className="cursor-pointer hover:text-neutral-light/40"
                >
                  {username}
                </a>
              )) ||
                (description && <span>{description}</span>)}
              {releaseDate && (
                <span>
                  <span className="mx-2">·</span>
                  <span>{timeAgo(releaseDate)}</span>
                </span>
              )}
            </div>

            {inSidebar && (
              <div className="actions absolute bottom-0 right-0 w-fit opacity-0 group-hover:opacity-100">
                <Tooltip text={'Agregar a la fila'}>
                  <AddToQueueButton onClick={addToQueue} />
                </Tooltip>
              </div>
            )}
          </div>

          {inSidebar && (
            <div className="stats flex gap-4">
              <Stats
                stat={'reproducciones'}
                statCount={formatQuantities(streamCount)}
                icon={<IoMdPlay size={16} />}
              />
              <Stats
                stat={'me gustas'}
                statCount={formatQuantities(likeCount)}
                icon={<IoMdHeart size={16} />}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
