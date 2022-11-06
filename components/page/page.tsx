import clsx from 'clsx';
import React from 'react';
import { Container } from '../ui/container';
import { WarningBanner } from '../ui/warning-banner';

export function Page({ className, children, ...rest }: React.ComponentPropsWithoutRef<'main'>) {
  return (
    <main className={clsx('flex flex-col flex-1 pt-8 pb-16', className)} {...rest}>
      <Container className="mb-8">
        <WarningBanner />
      </Container>
      {children}
    </main>
  );
}
