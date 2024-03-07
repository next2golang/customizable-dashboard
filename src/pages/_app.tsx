import { type AppType } from 'next/app';
import { ThemeProvider } from 'next-themes';
import '~/styles/globals.css';

import { Layout } from '~/components/layout';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
  );
};

export default MyApp;
