import { AddToQueueButton, PlayButton } from "../ui/buttons/IconButton";
import Card from "../ui/Card";
import Carousel from "../ui/Carousel";
import Tooltip from "../ui/Tooltip";

export default function CarouselSection({ sectionTitle, collection, sectionId, variant="landing" }) {
  const inHomeSection = variant = "home";
  const extraProps = inHomeSection ? { playButton: <PlayButton buttonSize={'large'} iconSize={20} custom={'btn-xxl'} />, actions: <Tooltip text={'Añadir a continuación'}><AddToQueueButton/></Tooltip> } : {};

  return (
    <section id={sectionId}>
      <div>
        <div className="section-header mx-8 mt-12">
          <h2 className="text-heading2 font-semibold">{sectionTitle}</h2>
        </div>
        <div className="section-content mt-8">
          <Carousel>
            {collection && collection.map((list, i) => (
              <div className="slider-panels" key={`list-${i + 1}`}>
                <Card
                  key={list.id}
                  artworkURL={list.artwork_url}
                  heading={list.title}
                  username={list.user.username}
                  {...extraProps}
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  )
}
