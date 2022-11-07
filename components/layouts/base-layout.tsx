import * as React from 'react';
import { Footer } from '../page/footer';
import { Navbar } from '../page/navbar';

export function BaseLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-100">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
