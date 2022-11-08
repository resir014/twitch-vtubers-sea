import * as React from 'react';
import { NextSeo } from 'next-seo';
import { BaseLayout } from '~/components/layouts/base-layout';
import { Container } from '~/components/ui/container';
import siteConfig from '~/modules/content/site-config';
import { PageHeader } from '~/components/page/page-header';
import { Page } from '~/components/page/page';

const meta = {
  title: 'About',
  description: siteConfig.site_description,
  tagline: siteConfig.site_tagline,
};

export default function AboutPage() {
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
          <div className="prose prose-md lg:prose-lg prose-indigo mx-auto mt-8 lg:mt-12">
            <p>
              While the rise of VTubers over the past few years — especially on the Southeast Asian
              region — is incredible to see, we felt like there&apos;s not much love for VTubers who
              primarily stream on <a href="https://www.twitch.tv/">Twitch</a>.
            </p>
            <p>
              Therefore, we sought to create this open and actively-updated database on well-known
              VTubers who stream on this platform we all know and love!
            </p>

            <h2>Maintainers</h2>
            <p>
              The list is maintained by the following people. If you want to be added into this
              list, please mention/DM one of them!
            </p>
            <ul>
              <li>
                <a href="https://twitter.com/resir014" target="_blank" rel="noopener noreferrer">
                  @resir014
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/KATSUKi_D_TUBE"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @KATSUKi_D_TUBE
                </a>
              </li>
            </ul>

            <h2>Notice</h2>
            <p>
              This project is a <strong>proof of concept</strong>, and still uses sample data of the
              VTubers that I know. Once the data structure is finalised, and a submission/removal
              process is laid out, I&apos;ll be opening this list out and will replace the
              &quot;database&quot; with actual data.
            </p>
            <p>
              Since I&apos;m personally not that deeply-invested into the VTuber scene, I will need
              help in updating this database. Let me know at{' '}
              <a href="https://twitter.com/resir014" target="_blank" rel="noopener noreferrer">
                @resir014
              </a>{' '}
              on Twitter if you&apos;re interested.
            </p>
          </div>
        </Container>
      </Page>
    </BaseLayout>
  );
}
