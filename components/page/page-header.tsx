import clsx from 'clsx';
import * as React from 'react';

export interface PageHeaderProps extends React.ComponentPropsWithoutRef<'p'> {
  pageTitle: string;
  description?: string;
}

export function PageHeader({ pageTitle, description, className, ...rest }: PageHeaderProps) {
  return (
    <div className={clsx('text-center', className)} {...rest}>
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
        {pageTitle}
      </h1>
      {description ? (
        <p className="mx-auto mt-2 max-w-4xl lg:text-lg text-gray-500">{description}</p>
      ) : null}
    </div>
  );
}
