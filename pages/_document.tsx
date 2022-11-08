import * as React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-gray-100 overflow-x-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
