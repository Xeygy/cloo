import "../css/style.css";
import "../css/form.css";
import Head from "next/head";
import Link from "next/link";
import type { AppProps } from "next/app";
import Image from "next/image";
import { Jost } from 'next/font/google';

const jost = Jost({ subsets: ['latin'], display: "swap" })

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={jost.className}>
      <Head>
        <title>Cloo</title>
      </Head>

      <div className="top-bar" >
        <Link style={{textAlign: "left"}} href="/">
          <Image
            src="/cloo_logo.png"
            width="0"
            height="0"
            sizes="100vw"
            style={{ width: 'max(10%, 5rem)', height: 'auto' }}
            alt="Clue Logo"
          />
        </Link>
        <div className="nav">
          <Link href="/">Home</Link>
          <Link href="/vote">Vote</Link>
        </div>
      </div>
      <div className="wrapper grid">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
