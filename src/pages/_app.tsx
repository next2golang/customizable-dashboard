import type { AppType, AppProps } from 'next/app';
import type { Session } from "next-auth";
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from "next-auth/react";
import '~/styles/globals.css';

import { Layout } from '~/components/layout';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    <SessionProvider session={session}>

      <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default MyApp;
