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
  const [error, setError] = useState(null);

  const throwError = (errorCode) => {
    const errors = {
      1: {
        title: "Connection to Metamask failed!",
        message: "Check if Metamask is installed/working properly.",
      },
    };
    throw errors[errorCode];
  };

  const connect = async () => {
    try {
      await activate(Metamask, () => throwError(1));
      localStorage.setItem("isWalletConnected", true);
    } catch (e) {
      setError(e);
    }
  };

  const disconnect = async () => {
    try {
      deactivate();
      localStorage.setItem("isWalletConnected", false);
      setWalletAddress("");
      setBalance(null);
    } catch (e) {
      setError(e);
    }
  };

  const getBalance = async () => {
    const address = account;
    const balance = await library.eth.getBalance(address);
    const balanceFormatted = library.utils.fromWei(balance);
    setBalance(balanceFormatted);
    // console.log(library);
    // console.log(connector);
    // console.log(connector.getChainId().then(console.log));
    // connector.handleChainChanged();
    // window.ethereum.on("networkChanged", function (networkId) {
    //   // Time to reload your interface with the new networkId
    //   console.log("network changed");
    // });
  };

  const getInfo = () => console.log("Get balance by address");

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem("isWalletConnected") === "true") {
        try {
          await activate(Metamask);
          localStorage.setItem("isWalletConnected", true);
        } catch (e) {
          setError(e);
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

  const handleContent = () => {
    // TODO: add loading
    if (error)
      return (
        <div className={styles.error}>
          {error.title}
          <p className={styles.message}>{error.message}</p>
        </div>
      );
    if (balance)
      return (
        <div className={styles.info}>
          <div className={styles.context}>
            <p className={styles.contextTitle}>Network:</p>
            <p className={styles.contextValue}>Network name here</p>
          </div>
          <div className={styles.context}>
            <p className={styles.contextTitle}>Balance:</p>
            <p className={styles.contextValue}>EXX: {balance}</p>
          </div>
          <div className={styles.context}>
            <p className={styles.contextTitle}>Transactions:</p>
            <p className={styles.contextValue}>Comming soon...</p>
          </div>
        </div>
      );
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Decentralized Wallet Checker | DWC</title>
        <meta name="description" content="Decentralized Wallet Checker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <section className={styles.wrapper}>
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
          <div className={styles.content}>{handleContent()}</div>
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
