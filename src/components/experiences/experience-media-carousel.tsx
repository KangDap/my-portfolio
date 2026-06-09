'use client';

import { Button } from '@/components/ui/button';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { type ExperienceMedia } from '@/data/experiences';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type ExperienceMediaInput = string | ExperienceMedia;

type ExperienceMediaCarouselProps = {
  media: ExperienceMediaInput[];
  fallbackAlt: string;
};

const OVERLAY_TRANSITION_DURATION = 240;

function normalizeMedia(media: ExperienceMediaInput[], fallbackAlt: string) {
  return media
    .map((item, index) => {
      if (typeof item === 'string') {
        return {
          src: item,
          alt: `${fallbackAlt} media ${index + 1}`,
        };
      }

      return item;
    })
    .filter((item) => item.src.trim().length > 0);
}

export function ExperienceMediaCarousel({
  media,
  fallbackAlt,
}: ExperienceMediaCarouselProps) {
  const images = useMemo(
    () => normalizeMedia(media, fallbackAlt),
    [fallbackAlt, media],
  );
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOverlayRendered, setIsOverlayRendered] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const closeTimerRef = useRef<number | null>(null);
  const hasMultipleImages = images.length > 1;

  const closeOverlay = useCallback(() => {
    setIsOverlayOpen(false);

    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
    }

    closeTimerRef.current = window.setTimeout(() => {
      setIsOverlayRendered(false);
    }, OVERLAY_TRANSITION_DURATION);
  }, []);

  const openOverlay = useCallback((index: number) => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    setCurrentIndex(index);
    setIsOverlayRendered(true);

    window.requestAnimationFrame(() => {
      setIsOverlayOpen(true);
    });
  }, []);

  useEffect(() => {
    if (!api) return;

    const updateCurrentIndex = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };

    const frame = window.requestAnimationFrame(updateCurrentIndex);
    api.on('select', updateCurrentIndex);
    api.on('reInit', updateCurrentIndex);

    return () => {
      window.cancelAnimationFrame(frame);
      api.off('select', updateCurrentIndex);
      api.off('reInit', updateCurrentIndex);
    };
  }, [api]);

  useEffect(() => {
    if (!isOverlayRendered) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeOverlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeOverlay, isOverlayRendered]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  if (images.length === 0) return null;

  const currentImage = images[currentIndex] ?? images[0];
  const overlay = isOverlayRendered ? (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Experience media preview"
      onClick={closeOverlay}
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-background/30 p-4 backdrop-blur-sm transition-opacity duration-200 sm:p-6',
        isOverlayOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
    >
      <figure
        onClick={(event) => event.stopPropagation()}
        className={cn(
          'flex w-full max-w-5xl flex-col gap-3 transition-all duration-200',
          isOverlayOpen
            ? 'translate-y-0 scale-100 opacity-100'
            : 'translate-y-3 scale-[0.98] opacity-0',
        )}
      >
        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            aria-label="Close media preview"
            onClick={closeOverlay}
          >
            <X data-icon="inline-start" />
          </Button>
        </div>

        <Carousel
          setApi={setApi}
          opts={{
            align: 'start',
            duration: 48,
            loop: hasMultipleImages,
            startIndex: currentIndex,
          }}
          className="w-full"
        >
          <CarouselContent className="!-ml-0 transition-transform duration-500 ease-out will-change-transform">
            {images.map((image, index) => (
              <CarouselItem key={image.src} className="!pl-0">
                <div
                  className={cn(
                    'relative aspect-video overflow-hidden rounded-lg border border-border bg-muted transition-all duration-500 ease-out',
                    index === currentIndex
                      ? 'scale-100 opacity-100'
                      : 'scale-[0.985] opacity-55',
                  )}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 960px, (min-width: 640px) 90vw, 100vw"
                    className="object-contain transition-transform duration-500 ease-out"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {hasMultipleImages ? (
            <>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </>
          ) : null}
        </Carousel>

        <figcaption className="flex items-center justify-between gap-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
          <span>{currentImage.alt}</span>
          {hasMultipleImages ? (
            <span className="shrink-0 tabular-nums">
              {currentIndex + 1}/{images.length}
            </span>
          ) : null}
        </figcaption>
      </figure>
    </div>
  ) : null;

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            aria-label={`Open ${image.alt}`}
            onClick={() => openOverlay(index)}
            className="group relative aspect-video w-24 overflow-hidden rounded-md border border-border bg-muted/40 outline-none transition-all hover:border-ring focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="96px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {typeof document !== 'undefined' && overlay
        ? createPortal(overlay, document.body)
        : null}
    </>
  );
}
