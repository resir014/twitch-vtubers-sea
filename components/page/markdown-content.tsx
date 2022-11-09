import clsx from 'clsx';
import * as React from 'react';
import htmr from 'htmr';
import htmrTransform from '~/utils/htmr-transform';

export interface MarkdownContentProps extends React.ComponentPropsWithoutRef<'div'> {
  content: string;
}

export function MarkdownContent({ className, content, ...rest }: MarkdownContentProps) {
  return (
    <div
      className={clsx('prose prose-md lg:prose-lg prose-indigo mx-auto mt-8 lg:mt-12', className)}
      {...rest}
    >
      {htmr(content, { transform: htmrTransform })}
    </div>
  );
}
