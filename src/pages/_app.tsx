import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { createConfig, configureChains } from 'wagmi'
import { goerli } from 'viem/chains'
import { publicProvider } from 'wagmi/providers/public'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from "wagmi/connectors/metaMask"
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { WagmiConfig } from 'wagmi'

const { chains, publicClient } = configureChains([goerli], [publicProvider()])

const config = createConfig({
  autoConnect:true,
  connectors: [
    new InjectedConnector({ chains, options:{
      name: "trustwallet",
      shimDisconnect: true,
      getProvider: () =>
      //@ts-ignore
        typeof window !== "undefined" ? window.trustwallet : undefined
    }
    }),
    new MetaMaskConnector({
      chains,
      options: {
        UNSTABLE_shimOnConnectSelectAccount: true,
        shimDisconnect: true
      }
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        UNSTABLE_shimOnConnectSelectAccount: true,
        shimDisconnect: true
      }
    }),
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
