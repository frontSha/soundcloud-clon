import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "./buttons/IconButton";

export default function Carousel({children: cards}) {
  const viewportRef = useRef(null);
  const [goPrev, setGoPrev] = useState(false);
  const [goNext, setGoNext] = useState(false);
  const getElement = () => viewportRef.current;
  const getStep = () => getElement()?.clientWidth ?? 0;

  const updateControls = () => {
    const el = getElement();
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setGoPrev(el.scrollLeft > 0);
    setGoNext(el.scrollLeft < max - 2);
  }

  useEffect(() => {
    const el = viewportRef.current;
    if(!el) return;

    const resizeObserver = new ResizeObserver(() => {
      updateControls();
    })
    resizeObserver.observe(el);

    el.addEventListener('scroll', updateControls, { passive: true });
    updateControls();

    return () => {
      resizeObserver.disconnect();
      el.removeEventListener('scroll', updateControls);
    }

  }, [cards])

  const next = () => {
    const el = getElement();
    if(!el) return;
    el.scrollBy({left: getStep(), behavior: "smooth"});
    requestAnimationFrame(updateControls);
  }

  const prev = () => {
    const el = getElement();
    if(!el) return;
    el.scrollBy({left: -getStep(), behavior: "smooth"});
    requestAnimationFrame(updateControls);
  }

  return (
    <div
      aria-roledescription="slider"
      className="md:ml-8 md:mt-4 md:pt-4 max-md:pb-6"
    >
      <div className="relative">
        <div
          className="scroller w-full overflow-x-auto max-md:overflow-x-scroll scroll-smooth [&::-webkit-scrollbar]:hidden"
          ref={viewportRef}
        >
          <div className="slider-content flex flex-nowrap md:*:pr-16 max-md:*:ml-8 max-md:*:last:mr-8">
            {cards}
          </div>
        </div>
        <div
          className="slider-button-left max-md:hidden absolute bottom-[55%] left-10 z-30"
        >
          <ArrowLeft onClick={prev} buttonSize={'medium'} isDisabled={!goPrev} />
        </div>
        <div
          className="slider-button-right max-md:hidden absolute bottom-[55%] right-10 z-30"
        >
          <ArrowRight onClick={next} buttonSize={'medium'} isDisabled={!goNext} />
        </div>
      </div>
    </div>
  );
}
