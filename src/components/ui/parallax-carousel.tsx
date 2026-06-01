'use client';

import { cn } from '@/lib/utils';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { useCallback, useEffect, useRef } from 'react';

type CarouselImage = {
  src: string;
  alt: string;
};

type ParallaxCarouselProps = {
  images: CarouselImage[];
  className?: string;
};

type EmblaApi = NonNullable<ReturnType<typeof useEmblaCarousel>[1]>;
type EmblaEventName = Parameters<Parameters<EmblaApi['on']>[1]>[1];

const TWEEN_FACTOR_BASE = 0.2;

export function ParallaxCarousel({ images, className }: ParallaxCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
  });
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);

  const setTweenNodes = useCallback((api: EmblaApi) => {
    tweenNodes.current = api
      .slideNodes()
      .map((slideNode) => {
        return slideNode.querySelector<HTMLElement>('[data-parallax-layer]');
      })
      .filter((node): node is HTMLElement => node !== null);
  }, []);

  const setTweenFactor = useCallback((api: EmblaApi) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * api.scrollSnapList().length;
  }, []);

  const tweenParallax = useCallback(
    (api: EmblaApi, eventName?: EmblaEventName) => {
      const engine = api.internalEngine();
      const scrollProgress = api.scrollProgress();
      const slidesInView = api.slidesInView();
      const isScrollEvent = eventName === 'scroll';

      api.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }

                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const translate = diffToTarget * (-1 * tweenFactor.current) * 100;
          const tweenNode = tweenNodes.current[slideIndex];

          if (tweenNode) {
            tweenNode.style.transform = `translateX(${translate}%)`;
          }
        });
      });
    },
    [],
  );

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenParallax(emblaApi);

    emblaApi
      .on('reInit', setTweenNodes)
      .on('reInit', setTweenFactor)
      .on('reInit', tweenParallax)
      .on('scroll', tweenParallax)
      .on('slideFocus', tweenParallax);
  }, [emblaApi, setTweenFactor, setTweenNodes, tweenParallax]);

  if (images.length === 0) return null;

  return (
    <div className={cn('w-full max-w-sm', className)}>
      <div
        ref={emblaRef}
        className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg"
      >
        <div className="flex touch-pan-y">
          {images.map((image) => (
            <div key={image.src} className="min-w-0 flex-[0_0_100%]">
              <div className="relative aspect-square overflow-hidden">
                <div
                  data-parallax-layer
                  className="absolute inset-y-0 -left-[15%] w-[130%]"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 24rem, 80vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
