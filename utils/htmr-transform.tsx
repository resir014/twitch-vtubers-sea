import * as React from 'react';
import Link from 'next/link';
import { HtmrOptions } from 'htmr/src/types';

const htmrTransform: HtmrOptions['transform'] = {
  a: (node: JSX.IntrinsicElements['a']) => {
    const { href, children, ...rest } = node;

    if (href) {
      if (href.startsWith('http')) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
            {children}
          </a>
        );
      }

      return (
        <Link href={href} passHref>
          <a {...rest}>{children}</a>
        </Link>
      );
    }

    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  },
};

export default htmrTransform;
