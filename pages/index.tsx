import * as React from 'react';
import { NextSeo } from 'next-seo';
import { Container } from '~/components/ui/container';
import { BaseLayout } from '~/components/layouts/base-layout';
import { trpc } from '~/utils/trpc';
import { CountryListItem } from '~/modules/country-list/country-list-item';
import siteConfig from '~/modules/content/site-config';
import { LoadingPlaceholder } from '~/components/ui/loading';

const meta = {
  title: `${siteConfig.site_tagline} | ${siteConfig.site_name}`,
};

export default function IndexPage() {
  const { data, isLoading } = trpc.getAllCountries.useQuery();

  const renderData = () => {
    if (isLoading) {
      return <LoadingPlaceholder />;
    }

    if (data) {
      return (
        <div className="rounded-lg grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.map(country => (
            <CountryListItem key={country.id} id={country.id} name={country.name} />
          ))}
        </div>
      );
    }

    return <div>Failed to load app.</div>;
  };

  return (
    <BaseLayout>
      <NextSeo title={meta.title} titleTemplate="%s" />
      <Container className="flex flex-col flex-1">
        <div className="text-center mb-8 lg:mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Twitch VTubers from Southeast Asia
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-xl text-gray-500">
            Welcome! This is an open and actively-updated database for VTubers in Southeast Asia who
            stream primarily on Twitch.
          </p>
        </div>
        <div className="flex flex-col flex-1">{renderData()}</div>
      </Container>
    </BaseLayout>
  );
}
