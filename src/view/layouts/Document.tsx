import { Links, LiveReload, Meta, Scripts } from 'remix';
import { PropsWithChildren } from 'react';

type DocumentProps = PropsWithChildren<{
  title?: string;
}>;

export function Document(props: DocumentProps) {
  const { title, children } = props;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        {title ? <title>{title}</title> : null}
        <link rel="icon" href="/favicon.png" type="image/png" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}
