import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import * as React from 'react';
import { Container } from '../ui/container';

const navigation = [{ name: 'About', href: '/about' }];

export function BaseLayout({ children }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
          <div className="flex w-full items-center justify-between border-b border-indigo-500 py-6 lg:border-none">
            <div className="flex items-center">
              <Link href="/" className="text-base font-bold text-indigo-500">
                <span>SEA Twitch VTubers</span>
              </Link>
              <div className="ml-10 hidden space-x-8 lg:block">
                {navigation.map(link => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-base font-medium text-indigo-500 hover:text-indigo-600"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center space-x-6 py-4 lg:hidden">
            {navigation.map(link => (
              <Link
                key={link.name}
                href={link.href}
                className="text-base font-medium text-indigo-500 hover:text-indigo-600"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </nav>
      </header>
      <div className="flex flex-col flex-1 pt-8 pb-16">
        <Container className="mb-8">
          <div className="rounded-md bg-yellow-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Heads up!</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    This project is a <strong>proof of concept</strong>, and still uses sample data
                    of the VTubers that I know. Once the data structure is finalised, and a
                    submission/removal process is laid out, I&apos;ll be opening this list out and
                    will replace the &quot;database&quot; with actual data.
                  </p>
                  <p className="mt-2">
                    Since I&apos;m personally not that deeply-invested into the VTuber scene, I will
                    need help in updating this database. Let me know at{' '}
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
              </div>
            </div>
          </div>
        </Container>
        {children}
      </div>
      <footer>
        <div className="mx-auto max-w-7xl overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
          <p className="mt-8 text-center text-base text-gray-400">
            Source code available soon&trade;. Made in Indonesia.
          </p>
        </div>
      </footer>
    </div>
  );
}
