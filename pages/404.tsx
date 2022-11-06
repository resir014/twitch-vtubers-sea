import * as React from 'react';
import CustomErrorPage from './_error';

export default function NotFoundPage() {
  return <CustomErrorPage statusCode={404} />;
}
