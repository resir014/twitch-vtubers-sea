import * as React from 'react';
import { NextSeo } from 'next-seo';
import { Container } from '~/components/ui/container';
import { BaseLayout } from '~/components/layouts/base-layout';
import { PaginatedStreamerListTable } from '~/modules/streamer-list/paginated-streamer-list-table';
import { PageHeader } from '~/components/page/page-header';
import { Page } from '~/components/page/page';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import CustomErrorPage from 'pages/_error';

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const { default: countries } = await import('~/modules/content/countries');

  if (!params?.country) {
    return {
      props: {
        country: null,
      },
    };
  }

  const { country } = params;

  const data = countries.find(item => item.id === country);

  if (!data) {
    return {
      props: {
        country: null,
      },
    };
  }

  return {
    props: {
      country: data,
    },
  };
}

export async function getStaticPaths() {
  const { default: countries } = await import('~/modules/content/countries');

  if (!countries.length) {
    return {
      paths: [],
      fallback: false,
    };
  }

  return {
    paths: countries.map(country => ({
      params: {
        country: country.id,
      },
    })),
    fallback: false,
  };
}

type VtubersListPageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function VtubersListPage({ country }: VtubersListPageProps) {
  if (!country) {
    return <CustomErrorPage statusCode={404} />;
  }

  const meta = {
    title: country.name,
    description: `Listing all VTubers from ${country.name} in the Southeast Asia Twitch VTubers database.`,
  };

  return (
    <BaseLayout>
      <NextSeo
        description={meta.description}
        openGraph={{
          title: meta.title,
          description: meta.description,
        }}
        title={meta.title}
      />
      <Page>
        <Container>
          <PageHeader pageTitle={meta.title} description={meta.description} />
          <PaginatedStreamerListTable country={country.id} />
        </Container>
      </Page>
    </BaseLayout>
  );
}
