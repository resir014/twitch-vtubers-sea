import clsx from 'clsx';
import * as React from 'react';

export function Container({ className, children }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={clsx('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  );
}
