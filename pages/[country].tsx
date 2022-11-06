import * as React from 'react';
import { NextSeo } from 'next-seo';
import { Container } from '~/components/ui/container';
import { useRouter } from 'next/router';
import { parseString } from '~/utils/query-parser';
import { BaseLayout } from '~/components/layouts/base-layout';
import { PaginatedStreamerListTable } from '~/modules/streamer-list/paginated-streamer-list-table';
import { trpc } from '~/utils/trpc';
import { LoadingSpinner } from '~/components/ui/loading';

export default function VtubersListPage() {
  const { query } = useRouter();
  const country = parseString(query.country);
  const { data, isLoading } = trpc.getCountryByCode.useQuery({ country });

  const meta = {
    title: data?.name,
    description: `Listing all VTubers from ${data?.name} in the Southeast Asia Twitch VTubers database.`,
  };

  return (
    <BaseLayout>
      <NextSeo
        description={meta.description}
        openGraph={{
          title: data?.name,
          description: meta.description,
        }}
        title={meta.title}
      />
      <Container>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center text-center py-8 mb-8">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
              {data?.name ? data.name : 'Loading...'}
            </h1>
            <p className="mx-auto mt-4 max-w-4xl text-lg text-gray-500">
              {data?.name
                ? `Listing all VTubers from ${data.name} in the Southeast Asia Twitch VTubers database.`
                : 'Please wait a moment...'}
            </p>
          </div>
        )}
        <PaginatedStreamerListTable country={country} />
      </Container>
    </BaseLayout>
  );
}
