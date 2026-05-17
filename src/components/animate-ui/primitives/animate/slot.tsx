'use client';

import { cn } from '@/lib/utils';
import { type HTMLMotionProps, isMotionComponent, motion } from 'motion/react';
import * as React from 'react';

type AnyProps = Record<string, unknown>;

type DOMMotionProps<T extends HTMLElement = HTMLElement> = Omit<
  HTMLMotionProps<keyof HTMLElementTagNameMap>,
  'ref'
> & { ref?: React.Ref<T> };

type WithAsChild<Base extends object> =
  | (Base & { asChild: true; children: React.ReactElement })
  | (Base & { asChild?: false | undefined });

type SlotProps<T extends HTMLElement = HTMLElement> = {
  children?: React.ReactElement | null;
} & DOMMotionProps<T>;

function mergeRefs<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  return (node) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === 'function') {
        ref(node);
      } else {
        (ref as React.RefObject<T | null>).current = node;
      }
    });
  };
}

function mergeProps<T extends HTMLElement>(
  childProps: AnyProps,
  slotProps: DOMMotionProps<T>,
): AnyProps {
  const merged: AnyProps = { ...childProps, ...slotProps };

  if (childProps.className || slotProps.className) {
    merged.className = cn(
      childProps.className as string,
      slotProps.className as string,
    );
  }

  if (childProps.style || slotProps.style) {
    merged.style = {
      ...(childProps.style as React.CSSProperties),
      ...(slotProps.style as React.CSSProperties),
    };
  }

  return merged;
}

function Slot<T extends HTMLElement = HTMLElement>({
  children,
  ref,
  ...props
}: SlotProps<T>) {
  if (!React.isValidElement(children)) return null;

  const isAlreadyMotion =
    typeof children.type === 'object' &&
    children.type !== null &&
    isMotionComponent(children.type);

  const { ref: childRef, ...childProps } = children.props as {
    ref?: React.Ref<T>;
  } & Record<string, unknown>;

  const mergedProps = mergeProps(childProps, props);

  if (!isAlreadyMotion) {
    // Avoid creating a motion-enhanced component during render (this trips
    // the static-components lint rule). Instead, wrap the child in a
    // motion.div and apply merged props to the wrapper. Clone the child to
    // preserve its original ref.
    const { className, style, ...rest } = mergedProps as HTMLMotionProps<'div'>;

    return (
      <motion.div
        {...rest}
        className={className}
        style={style}
        ref={ref as React.Ref<HTMLDivElement>}
      >
        {React.cloneElement(
          children as React.ReactElement<{ ref?: React.Ref<T> }>,
          { ref: childRef },
        )}
      </motion.div>
    );
  }

  const Base = children.type as React.ElementType;

  return (
    <Base {...mergedProps} ref={mergeRefs(childRef as React.Ref<T>, ref)} />
  );
}

export {
  Slot,
  type SlotProps,
  type WithAsChild,
  type DOMMotionProps,
  type AnyProps,
};
