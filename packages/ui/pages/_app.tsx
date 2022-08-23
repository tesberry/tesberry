import '../styles/globals.css'
import '../components/carplay/Carplay.css';
import '@fontsource/montserrat';
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
