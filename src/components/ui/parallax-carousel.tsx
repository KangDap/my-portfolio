'use client';

import { cn } from '@/lib/utils';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

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
  const autoplay = useMemo(
    () =>
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    [],
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
    },
    [autoplay],
  );
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);
  const restartFrame = useRef(0);
  const hasPointerInteraction = useRef(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const getAutoplay = useCallback(() => {
    return emblaApi?.plugins().autoplay;
  }, [emblaApi]);

  const pauseAutoplay = useCallback(() => {
    getAutoplay()?.stop();
  }, [getAutoplay]);

  const playAutoplay = useCallback(() => {
    getAutoplay()?.play();
  }, [getAutoplay]);

  const restartAutoplay = useCallback(() => {
    const autoplayApi = getAutoplay();

    if (!autoplayApi) return;

    window.cancelAnimationFrame(restartFrame.current);
    autoplayApi.stop();
    restartFrame.current = window.requestAnimationFrame(() => {
      getAutoplay()?.play();
    });
  }, [getAutoplay]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
      restartAutoplay();
    },
    [emblaApi, restartAutoplay],
  );

  const updateSelectedIndex = useCallback((api: EmblaApi) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

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
    const frame = requestAnimationFrame(() => {
      updateSelectedIndex(emblaApi);
    });

    const handlePointerDown = () => {
      hasPointerInteraction.current = true;
    };

    const handleSelect = (api: EmblaApi) => {
      updateSelectedIndex(api);

      if (!hasPointerInteraction.current) return;

      hasPointerInteraction.current = false;
      restartAutoplay();
    };

    emblaApi
      .on('reInit', setTweenNodes)
      .on('reInit', setTweenFactor)
      .on('reInit', tweenParallax)
      .on('reInit', updateSelectedIndex)
      .on('pointerDown', handlePointerDown)
      .on('select', handleSelect)
      .on('scroll', tweenParallax)
      .on('slideFocus', tweenParallax);

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(restartFrame.current);
    };
  }, [
    emblaApi,
    restartAutoplay,
    setTweenFactor,
    setTweenNodes,
    tweenParallax,
    updateSelectedIndex,
  ]);

  if (images.length === 0) return null;

  return (
    <div
      className={cn('w-full max-w-sm', className)}
      onMouseEnter={pauseAutoplay}
      onMouseLeave={playAutoplay}
      onFocus={pauseAutoplay}
      onBlur={playAutoplay}
    >
      <div
        ref={emblaRef}
        className="overflow-hidden rounded-2xl border border-border bg-card/70 shadow-lg"
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

      <div className="mt-4 flex items-center justify-center gap-2">
        {images.map((image, index) => {
          const isSelected = index === selectedIndex;

          return (
            <button
              key={image.src}
              type="button"
              aria-label={`Go to image ${index + 1}`}
              aria-current={isSelected ? 'true' : undefined}
              onClick={() => scrollTo(index)}
              className={cn(
                'h-2 rounded-full transition-all duration-300 ease-out',
                'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none',
                isSelected
                  ? 'w-7 bg-foreground'
                  : 'w-2 bg-muted-foreground/35 hover:bg-muted-foreground/60',
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
