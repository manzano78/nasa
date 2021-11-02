import { Outlet } from 'react-router-dom';

import { Document } from '~/view/layouts/Document';

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
