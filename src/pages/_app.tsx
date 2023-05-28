import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { createConfig, configureChains, mainnet } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { WagmiConfig } from 'wagmi'

const { chains, publicClient } = configureChains([mainnet], [publicProvider()])
 
const config = createConfig({
  connectors: [
    new InjectedConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi.sh',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
        metadata: {
          name: 'wagmi',
          description: 'my wagmi app',
          url: 'https://wagmi.sh',
          icons: ['https://wagmi.sh/icon.png'],
        },
      },
    })
    
  ],
  publicClient,
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config} >
      <Component {...pageProps} />
    </WagmiConfig>
    )
}
