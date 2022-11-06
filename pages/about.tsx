import * as React from 'react';
import { NextSeo } from 'next-seo';
import { BaseLayout } from '~/components/layouts/base-layout';
import { Container } from '~/components/ui/container';
import siteConfig from '~/modules/content/site-config';

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
      <Container>
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
            {meta.title}
          </h1>
          <p className="mx-auto mt-4 max-w-4xl text-lg text-gray-500">{meta.tagline}</p>
        </div>
        <div className="prose prose-lg prose-indigo mx-auto mt-8 lg:mt-12">
          <p>
            While the rise of VTubers over the past few years, especially on the Southeast Asian
            region is incredible to see, we felt like there&apos;s not much love for VTubers who
            primarily stream on <a href="https://www.twitch.tv/">Twitch</a>.
          </p>
          <p>
            Therefore, we sought to create this open and actively-updated database on well-known
            VTubers who stream on this platform we all know and love!.
          </p>
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
            <a
              className="font-medium hover:underline"
              href="https://twitter.com/resir014"
              target="_blank"
              rel="noopener noreferrer"
            >
              @resir014
            </a>{' '}
            on Twitter if you&apos;re interested.
          </p>
        </div>
      </Container>
    </BaseLayout>
  );
}
