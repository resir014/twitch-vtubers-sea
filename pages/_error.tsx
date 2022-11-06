import * as React from 'react';
import type { ErrorProps } from 'next/error';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { BaseLayout } from '~/components/layouts/base-layout';
import siteConfig from '~/modules/content/site-config';

const statusCodes: { [code: number]: string } = {
  400: 'Bad request.',
  404: 'Page not found.',
  405: 'Method not allowed.',
  500: 'Internal server error.',
  0: 'An unknown error has occured.',
};

export default function CustomErrorPage({ statusCode, title }: ErrorProps) {
  const errorMessage = React.useMemo(
    () => title ?? statusCodes[statusCode || 0],
    [statusCode, title]
  );

  const meta = {
    title: `${statusCode || 0}: ${errorMessage}`,
    description: siteConfig.site_description,
    tagline: siteConfig.site_tagline,
  };

  return (
    <BaseLayout>
      <NextSeo title={meta.title} noindex />
      <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="text-center">
            <p className="text-base font-semibold text-indigo-600">{statusCode || 0}</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {errorMessage}
            </h1>
            <p className="mt-2 text-base text-gray-500">Please check your URL and try again.</p>
            <div className="mt-6">
              <Link
                href="/"
                className="text-base font-medium text-indigo-600 hover:text-indigo-500"
              >
                Go back home
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </BaseLayout>
  );
}
