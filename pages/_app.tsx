import "../css/style.css";
import "../css/form.css";
import Head from "next/head";
import Link from "next/link";
import type { AppProps } from "next/app";
import Image from "next/image";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Cloo</title>
      </Head>

      <div className="top-bar">
        <Image
          src="/cloo_logo.png"
          width="0"
          height="0"
          sizes="100vw"
          style={{ width: 'max(10%, 3rem)', height: 'auto' }}
          alt="Clue Logo"
        />
        <div className="nav">
          <Link href="/">Home</Link>
          <Link href="/vote">Vote</Link>
        </div>
      </div>
      <div className="wrapper grid">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
