import '../styles/index.css';
import '../styles/App.css';
import '../styles/coinflip.css';
import '../styles/header.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
