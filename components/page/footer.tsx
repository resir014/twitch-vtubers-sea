import * as React from 'react';

export function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-7xl overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-base text-gray-400">
          Source code available{' '}
          <a
            className="hover:text-gray-900"
            href="https://github.com/resir014/twitch-vtubers-sea"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          . Made in Indonesia.
        </p>
      </div>
    </footer>
  );
}
