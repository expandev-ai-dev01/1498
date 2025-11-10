import { clsx } from 'clsx';
import type { LoadingSpinnerProps } from './types';

export function getLoadingSpinnerClassName(props: LoadingSpinnerProps): string {
  const { size = 'medium', className } = props;

  return clsx(
    'flex items-center justify-center',
    {
      'h-4 w-4': size === 'small',
      'h-8 w-8': size === 'medium',
      'h-12 w-12': size === 'large',
    },
    className
  );
}
