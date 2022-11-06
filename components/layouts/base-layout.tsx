import Link from 'next/link';
import * as React from 'react';

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
      <main className="flex flex-col flex-1 pt-8 pb-16">{children}</main>
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
