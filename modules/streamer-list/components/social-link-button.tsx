import clsx from 'clsx';
import * as React from 'react';

export function SocialLinkButton({
  href,
  children,
  className,
  ...rest
}: React.ComponentPropsWithoutRef<'a'>) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        'flex items-center justify-center w-6 h-6 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-800 focus:ring-2 focus:ring-indigo-500',
        className
      )}
      {...rest}
    >
      {children}
    </a>
  );
}
