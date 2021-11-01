import { Outlet } from 'react-router-dom';
import { LinksFunction } from 'remix';
import antdStylesUrl from 'antd/dist/antd.css';

import { Document } from '~/view/layouts/Document';

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: antdStylesUrl,
  },
];

export default function RootLayout() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document title="Oops!">
      <h1>App Error</h1>
      <pre>{error.message}</pre>
    </Document>
  );
}
