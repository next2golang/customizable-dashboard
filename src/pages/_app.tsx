import { type AppType, AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from "next-auth/react";
import '~/styles/globals.css';

import { Layout } from '~/components/layout';

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  return (
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
