import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import * as React from 'react';

export function WarningBanner() {
  return (
    <div className="rounded-md bg-yellow-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">Heads up!</h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>
              We&apos;re currently setting up a submission/removal process for the database. See our{' '}
              <Link href="/about" className="font-medium hover:underline">
                About page
              </Link>{' '}
              for future updates!
            </p>
            <p className="mt-2">
              In the meantime, you can mention/DM either{' '}
              <a
                className="font-medium hover:underline"
                href="https://twitter.com/resir014"
                target="_blank"
                rel="noopener noreferrer"
              >
                @resir014
              </a>{' '}
              or{' '}
              <a
                className="font-medium hover:underline"
                href="https://twitter.com/KATSUKi_D_TUBE"
                target="_blank"
                rel="noopener noreferrer"
              >
                @KATSUKi_D_TUBE
              </a>{' '}
              on Twitter if you want to be added to the database.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
