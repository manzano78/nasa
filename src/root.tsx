import { Meta, Links, Scripts, LiveReload } from 'remix';
import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}
