import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { createConfig, configureChains } from 'wagmi'
import { mainnet } from 'viem/chains'
import { publicProvider } from 'wagmi/providers/public'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from "wagmi/connectors/metaMask"
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { WagmiConfig } from 'wagmi'

const { chains, publicClient } = configureChains([mainnet], [publicProvider()])

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
    new WalletConnectConnector({
      chains,
      options: {
        projectId: "2a42e5f44eaac002e60ba61a895028f6",
        metadata: {
          name: "Seedify",
          description: "Seedworld is a UGC based Gaming Metaverse.",
          url: typeof document != 'undefined' ? document.URL : '',
          icons: ["https://seedworld.io/favicon.ico"]
        }
      }
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
