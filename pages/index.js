import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Image from "next/image";
import Metamask from "../resources/connectors";
import Input from "../components/Input";
import Button from "../components/Button";
import styles from "../styles/pages/index.module.scss";
import background from "../public/background.jpg";
import metamask from "../public/metamask.png";

export default function Home() {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState(null);

  const connect = async () => {
    try {
      await activate(Metamask);
      localStorage.setItem("isWalletConnected", true);
    } catch (error) {
      console.log(error);
    }
  };

  const disconnect = async () => {
    try {
      deactivate();
      localStorage.setItem("isWalletConnected", false);
      setWalletAddress("");
      setBalance(null);
    } catch (error) {
      console.log(error);
    }
  };

  const getBalance = async () => {
    const address = account;
    const balance = await library.eth.getBalance(address);
    const balanceFormatted = library.utils.fromWei(balance);
    setBalance(balanceFormatted);
    console.log(library);
    console.log(connector);
    console.log(connector.getChainId().then(console.log));
    // connector.handleChainChanged();
  };

  const getInfo = () => console.log("Get balance by address");

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem("isWalletConnected") === "true") {
        try {
          await activate(Metamask);
          localStorage.setItem("isWalletConnected", true);
        } catch (error) {
          console.log(error);
        }
      }
    };
    connectWalletOnPageLoad();
  }, []);

  useEffect(() => {
    if (account) {
      setWalletAddress(account);
      getBalance();
    }
  }, [account]);

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
                disabled={!!account}
              />
              <Button
                variant="secondary"
                size="small"
                onClick={() => getInfo()}
                disabled={!!account}
              >
                Get info
              </Button>
            </div>
            <Button icon={metamask} onClick={active ? disconnect : connect}>
              {active ? "Disconect" : "Connect with Metamask"}
            </Button>
          </div>
          <div className={styles.info}>
            <p>BALANCE:</p>
            <span>{balance}</span>
          </div>
          <Image
            src={background}
            className={styles.background}
            alt="Background"
            layout="fill"
            objectFit="cover"
            priority
          />
        </section>
      </main>
    </div>
  );
}
