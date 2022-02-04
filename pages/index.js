import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Input from "../components/Input";
import Button from "../components/Button";
import styles from "../styles/pages/index.module.scss";
import background from "../public/background.jpg";
import metamask from "../public/metamask.png";

export default function Home() {
  const [walletAddress, setWalletAddress] = useState("");

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
            <div className={styles.search}>
              <Input
                value={walletAddress}
                onChange={setWalletAddress}
                placeholder="Wallet address"
                style={{ "margin-right": "25px" }}
              />
              <Button
                variant="secondary"
                size="small"
                maxWidth={150}
                onClick={() => console.log(walletAddress)}
              >
                Get info
              </Button>
            </div>
            <Button icon={metamask} onClick={() => console.log("clicked")}>
              Connect with Metamask
            </Button>
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
