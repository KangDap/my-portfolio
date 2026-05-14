import { cn } from '@/lib/utils';
import * as React from 'react';

type FieldGroupProps = React.ComponentProps<'div'>;

type FieldProps = React.ComponentProps<'div'>;

type FieldLabelProps = React.ComponentProps<'label'>;

type FieldDescriptionProps = React.ComponentProps<'p'>;

function FieldGroup({ className, ...props }: FieldGroupProps) {
  return (
    <div
      data-slot="field-group"
      className={cn('flex flex-col gap-4', className)}
      {...props}
    />
  );
}

function Field({ className, ...props }: FieldProps) {
  return (
    <div
      data-slot="field"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  );
}

function FieldLabel({ className, ...props }: FieldLabelProps) {
  return (
    <label
      data-slot="field-label"
      className={cn('text-sm font-medium text-foreground', className)}
      {...props}
    />
  );
}

function FieldDescription({ className, ...props }: FieldDescriptionProps) {
  return (
    <p
      data-slot="field-description"
      className={cn('text-xs text-muted-foreground', className)}
      {...props}
    />
  );
}

export { FieldGroup, Field, FieldLabel, FieldDescription };
