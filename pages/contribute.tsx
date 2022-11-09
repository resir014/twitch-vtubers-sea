import * as React from 'react';
import type { InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import { BaseLayout } from '~/components/layouts/base-layout';
import { MarkdownContent } from '~/components/page/markdown-content';
import { Page } from '~/components/page/page';
import { PageHeader } from '~/components/page/page-header';
import { Container } from '~/components/ui/container';
import { getContributePage } from '~/modules/content/contribute';
import siteConfig from '~/modules/content/site-config';

export async function getStaticProps() {
  const { data, content } = await getContributePage();

  return {
    props: {
      data,
      content,
    },
  };
}

type ContributePageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function ContributePage({ data, content }: ContributePageProps) {
  const meta = {
    title: typeof data.title === 'string' ? data.title : String(data.title),
    description: typeof data.description === 'string' ? data.description : String(data.description),
    tagline: siteConfig.site_tagline,
  };

  return (
    <BaseLayout>
      <NextSeo
        description={meta.description}
        openGraph={{ title: meta.title, description: meta.description }}
        title={meta.title}
      />
      <Page>
        <Container>
          <PageHeader pageTitle={meta.title} description={meta.tagline} />
          <MarkdownContent content={content} />
        </Container>
      </Page>
    </BaseLayout>
  );
}
