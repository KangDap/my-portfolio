'use client';

import {
  Slot,
  type WithAsChild,
} from '@/components/animate-ui/primitives/animate/slot';
import { type HTMLMotionProps, motion } from 'motion/react';
import * as React from 'react';

type ButtonProps = WithAsChild<
  HTMLMotionProps<'button'> & {
    hoverScale?: number;
    tapScale?: number;
  }
>;

function Button({
  hoverScale = 1.05,
  tapScale = 0.95,
  asChild = false,
  ...props
}: ButtonProps) {
  if (asChild) {
    const { children, ...slotProps } = props as HTMLMotionProps<'button'> & {
      children: React.ReactElement;
    };

    return (
      <Slot
        whileTap={{ scale: tapScale }}
        whileHover={{ scale: hoverScale }}
        {...slotProps}
      >
        {children}
      </Slot>
    );
  }

  return (
    <motion.button
      whileTap={{ scale: tapScale }}
      whileHover={{ scale: hoverScale }}
      {...props}
    />
  );
}

export { Button, type ButtonProps };
