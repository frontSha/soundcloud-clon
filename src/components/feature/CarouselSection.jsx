import Card from "../ui/Card";
import Carousel from "../ui/Carousel";

export default function CarouselSection({ sectionTitle, collection, sectionId }) {

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
                  releaseDate={list.release}
                  buttonIconSize={'20'}
                  playlist={list}
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  )
}
