import * as React from 'react';
import Link from 'next/link';
import { HtmrOptions } from 'htmr/src/types';

const htmrTransform: HtmrOptions['transform'] = {
  a: (node: JSX.IntrinsicElements['a']) => {
    const { href, children, ref: _, ...rest } = node;

    if (href) {
      if (href.startsWith('http')) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
            {children}
          </a>
        );
      }

      return (
        <Link href={href} {...rest}>
          {children}
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
