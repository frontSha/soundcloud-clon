import { IoMdHeart, IoMdPlay } from "react-icons/io";
import Stats from "./Stats";

export default function Card({
  playButton,
  actions,
  cardLink,
  artworkURL,
  heading,
  username,
  userLink,
  description,
  releaseDate,
  variant = "default",
  likeCount,
  streamCount
}) {

  const inSidebar = variant === "sidebar";

  return (
    <div className="w-fit group">
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
              className={`buttons w-full h-full grid grid-cols-1 grid-rows-[1fr_auto] place-items-center max-md:hidden`}
            >
              <div className="play-button">{playButton}</div>
              {!inSidebar && (
                <div
                  className="action-buttons place-self-end mr-2 mb-1 xl:mr-4 xl:mb-4 lg:mr-0 lg:mb-2"
                  data-theme="light"
                  data-variant="ghost"
                >
                  {actions}
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
                  <span>{releaseDate}</span>
                </span>
              )}
            </div>

            {inSidebar && (
              <div className="actions absolute bottom-0 right-0 w-fit flex gap-4 opacity-0 group-hover:opacity-100">
                {actions}
              </div>
            )}
          </div>

          {inSidebar && (
            <div className="stats flex gap-4">
              <Stats
                stat={'reproducciones'}
                statCount={streamCount}
                icon={<IoMdPlay size={16} />}
              />
              <Stats
                stat={'me gustas'}
                statCount={likeCount}
                icon={<IoMdHeart size={16} />}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
