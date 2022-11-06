import * as React from 'react';

export function LoadingSpinner() {
  return (
    <div className="grid grid-rows-[1rem,1rem] grid-cols-[1rem,1rem] animate-spin w-fit gap-2">
      <div className="bg-blue-500 rounded-full" />
      <div className="bg-blue-400 rounded-full" />
      <div className="bg-blue-400 rounded-full" />
      <div className="bg-blue-500 rounded-full" />
    </div>
  );
}

export function LoadingPlaceholder() {
  return (
    <div className="flex items-center justify-center flex-1 p-8">
      <LoadingSpinner />
    </div>
  );
}
