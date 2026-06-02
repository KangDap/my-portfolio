'use client';

import {
  Slot,
  type WithAsChild,
} from '@/components/animate-ui/primitives/animate/slot';
import { getStrictContext } from '@/lib/get-strict-context';
import {
  type HTMLMotionProps,
  type MotionStyle,
  type MotionValue,
  type SpringOptions,
  motion,
  useMotionValue,
  useSpring,
} from 'motion/react';
import * as React from 'react';

type TiltContextType = {
  sRX: MotionValue<number>;
  sRY: MotionValue<number>;
  transition: SpringOptions;
};

const [TiltProvider, useTilt] =
  getStrictContext<TiltContextType>('TiltContext');

type TiltProps = WithAsChild<
  Omit<HTMLMotionProps<'div'>, 'children'> & {
    children?: React.ReactNode;
    maxTilt?: number;
    perspective?: number;
    transition?: SpringOptions;
  }
>;

function Tilt({
  children,
  maxTilt = 10,
  perspective = 800,
  style,
  transition = {
    stiffness: 300,
    damping: 25,
    mass: 0.5,
  },
  onMouseMove,
  onMouseLeave,
  asChild = false,
  ...props
}: TiltProps) {
  const rX = useMotionValue(0);
  const rY = useMotionValue(0);

  const sRX = useSpring(rX, transition);
  const sRY = useSpring(rY, transition);

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseMove?.(e);
      const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const nx = px * 2 - 1;
      const ny = py * 2 - 1;
      rY.set(nx * maxTilt);
      rX.set(-ny * maxTilt);
    },
    [maxTilt, rX, rY, onMouseMove],
  );

  const handleMouseLeave = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseLeave?.(e);
      rX.set(0);
      rY.set(0);
    },
    [rX, rY, onMouseLeave],
  );

  const tiltStyle: MotionStyle = {
    perspective,
    transformStyle: 'preserve-3d',
    willChange: 'transform',
    ...style,
  };

  if (asChild) {
    return (
      <TiltProvider value={{ sRX, sRY, transition }}>
        <Slot
          style={tiltStyle}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          {...props}
        >
          {children}
        </Slot>
      </TiltProvider>
    );
  }

  return (
    <TiltProvider value={{ sRX, sRY, transition }}>
      <motion.div
        style={tiltStyle}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </motion.div>
    </TiltProvider>
  );
}

type TiltContentProps = WithAsChild<
  Omit<HTMLMotionProps<'div'>, 'children'> & {
    children?: React.ReactNode;
  }
>;

function TiltContent({
  children,
  style,
  transition,
  asChild = false,
  ...props
}: TiltContentProps) {
  const { sRX, sRY, transition: tiltTransition } = useTilt();

  const tiltContentStyle: MotionStyle = {
    rotateX: sRX,
    rotateY: sRY,
    willChange: 'transform',
    ...style,
  };

  if (asChild) {
    return (
      <Slot
        style={tiltContentStyle}
        transition={transition ?? tiltTransition}
        {...props}
      >
        {children}
      </Slot>
    );
  }

  return (
    <motion.div
      style={tiltContentStyle}
      transition={transition ?? tiltTransition}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export { Tilt, TiltContent, type TiltProps, type TiltContentProps };
