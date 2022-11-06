import * as React from 'react';
import { NextSeo } from 'next-seo';
import { Container } from '~/components/ui/container';
import { useRouter } from 'next/router';
import { parseString } from '~/utils/query-parser';
import { BaseLayout } from '~/components/layouts/base-layout';
import { PaginatedStreamerListTable } from '~/modules/streamer-list/paginated-streamer-list-table';
import { trpc } from '~/utils/trpc';
import { WarningBanner } from '~/components/ui/warning-banner';
import { PageHeader } from '~/components/ui/page-header';

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
      <Container className="mb-8">
        <WarningBanner />
      </Container>
      <Container>
        <PageHeader
          pageTitle={!isLoading && data?.name ? data.name : 'Loading...'}
          description={
            !isLoading && data?.name
              ? `Listing all VTubers from ${data.name} in the Southeast Asia Twitch VTubers database.`
              : 'Please wait a moment...'
          }
        />
        <PaginatedStreamerListTable country={country} />
      </Container>
    </BaseLayout>
  );
}
