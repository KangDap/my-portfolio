'use client';

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <div className="z-50">
      <Sonner
        theme={theme as ToasterProps['theme']}
        className="toaster group"
        icons={{
          success: <CircleCheckIcon className="size-4" />,
          info: <InfoIcon className="size-4" />,
          warning: <TriangleAlertIcon className="size-4" />,
          error: <OctagonXIcon className="size-4" />,
          loading: <Loader2Icon className="size-4 animate-spin" />,
        }}
        style={
          {
            '--normal-bg': 'var(--popover)',
            '--normal-text': 'var(--popover-foreground)',
            '--normal-border': 'var(--border)',
            '--border-radius': 'var(--radius)',
            '--success-bg': 'rgb(220 252 231)',
            '--success-border': 'rgb(134 239 172)',
            '--success-text': 'rgb(20 83 45)',
            '--error-bg': 'rgb(254 226 226)',
            '--error-border': 'rgb(248 113 113)',
            '--error-text': 'rgb(127 29 29)',
          } as React.CSSProperties
        }
        toastOptions={{
          classNames: {
            toast: 'cn-toast',
            success:
              'bg-[--success-bg] border border-[--success-border] text-[--success-text]',
            error:
              'bg-[--error-bg] border border-[--error-border] text-[--error-text]',
          },
        }}
        {...props}
      />
    </div>
  );
};

export { Toaster };
