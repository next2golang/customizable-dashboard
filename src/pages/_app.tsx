import type { AppType, AppProps } from 'next/app';
import type { Session } from "next-auth";
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from "next-auth/react";
import { useRouter } from 'next/router';

import {
  RainbowKitProvider,
  getDefaultWallets,
  Locale,
  getDefaultConfig,
  createAuthenticationAdapter,
  RainbowKitAuthenticationProvider,
} from '@rainbow-me/rainbowkit';

import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { WagmiProvider } from 'wagmi';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
  zora,
} from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Layout } from '~/components/layout';
import { ConfigProvider } from 'antd';

import '~/styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';

const { wallets } = getDefaultWallets();

const config = getDefaultConfig({
  appName: 'RainbowKit demo',
  projectId: 'YOUR_PROJECT_ID',
  wallets: [
    ...wallets,
    {
      groupName: 'Other',
      wallets: [argentWallet, trustWallet, ledgerWallet],
    },
  ],
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    zora,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  ssr: true,
});

const queryClient = new QueryClient();

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  const { locale } = useRouter() as { locale: Locale };
  // const { status } = useSession();
  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    <SessionProvider session={session}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider locale={locale}>
            <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
              <ConfigProvider
                theme={{
                  token: {
                    colorBgContainer: "#154beb",
                    colorBorderSecondary: "#154beb",
                    colorText: "#a4a5a7"
                  },
                  components: {
                    Tabs: {
                      cardBg: "#11141d",
                      inkBarColor: "#11141d",
                      itemColor: "rgba(255, 255, 255, 0.88)",
                      itemSelectedColor: "rgba(255, 255, 255, 0.88)"
                      /* here is your component tokens */
                    },
                  },
                }}
              >
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </ConfigProvider>
            </ThemeProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </SessionProvider>
  );
};

export default MyApp;
