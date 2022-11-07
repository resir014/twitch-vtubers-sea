/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import NProgress from 'nprogress';
import { config } from '@fortawesome/fontawesome-svg-core';
import siteConfig from '~/modules/content/site-config';
import { trpc } from '../utils/trpc';

import '~/styles/fonts';
import '~/styles/globals.css';
import 'nprogress/nprogress.css';
import '~/styles/nprogress.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;

const meta = {
  siteName: siteConfig.site_name,
  title: `${siteConfig.site_tagline} | ${siteConfig.site_name}`,
  tagline: siteConfig.site_tagline,
  description: siteConfig.site_description,
  url: siteConfig.site_url,
};

const progress = NProgress.configure({
  showSpinner: false,
});

function MyApp({ Component, pageProps, router }: AppProps) {
  React.useEffect(() => {
    const handleStart = (_: string, { shallow }: { shallow: boolean }) => {
      if (!shallow) {
        progress.start();
      }
    };
    const handleStop = () => {
      progress.done();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  return (
    <>
      <DefaultSeo
        canonical={`${meta.url}${router.asPath || '/'}`}
        description={meta.description}
        openGraph={{
          type: 'website',
          locale: 'en_US',
          title: meta.title,
          description: meta.description,
          site_name: meta.siteName,
        }}
        title={siteConfig.site_tagline}
        titleTemplate={`%s | ${meta.siteName}`}
      />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default trpc.withTRPC(MyApp);
