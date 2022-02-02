import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import background from "../public/background.jpg";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Decentralized Wallet Checker | DWC</title>
        <meta name="description" content="Decentralized Wallet Checker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <section className={styles.content}>
          <div className={styles.welcome}>
            <h1 className={styles.title}>
              Wallet. <br />
              Balance. <br />
              Transactions.
            </h1>
            <h2 className={styles.subtitle}>
              Connect your wallet and check all your balances and transactions
              in one place.
            </h2>
          </div>
          <div className={styles.info}>Balance and Transactions</div>
          <Image
            src={background}
            className={styles.background}
            alt="Background"
            layout="fill"
            objectFit="cover"
          />
        </section>
      </main>
    </div>
  );
}
