import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
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
              This project is a <strong>proof of concept</strong>, and still uses sample data of the
              VTubers that I know. Once the data structure is finalised, and a submission/removal
              process is laid out, I&apos;ll be opening this list out and will replace the
              &quot;database&quot; with actual data.
            </p>
            <p className="mt-2">
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
        </div>
      </div>
    </div>
  );
}
