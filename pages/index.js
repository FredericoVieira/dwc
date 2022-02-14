/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import Head from "next/head";
import Image from "next/image";
import Metamask from "../utils/connectors";
import Input from "../components/Input";
import Button from "../components/Button";
import Content from "../components/Content";
import { throwError, errors } from "../utils/error";
import { formatBalance, networkMapper } from "../utils/formatter";
import styles from "../styles/pages/index.module.scss";
import background from "../public/background.jpg";
import metamask from "../public/metamask.png";

export default function Index() {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();
  const [walletAddress, setWalletAddress] = useState("");
  const initialInfosState = {
    networkId: null,
    token: null,
    balance: null,
    context: null,
  };
  const [infos, setInfos] = useState(initialInfosState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Metamask methods

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
      setInfos(initialInfosState);
    } catch (e) {
      setError(e);
    }
  };

  const getInfosFromMetamask = async () => {
    setError(null);
    setIsLoading(true);
    const address = account;
    const balance = formatBalance(
      library,
      await library.eth.getBalance(address)
    );

    const networkId = await library.eth.net.getId();
    const { token } = networkMapper[networkId];
    setInfos({ networkId, token, balance, context: "metamask" });
    setIsLoading(false);
  };

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
      getInfosFromMetamask();
    }
  }, [account]);

  useEffect(() => {
    window?.ethereum.on("networkChanged", function (networkId) {
      if (infos.networkId != networkId) getInfosFromMetamask();
    });
  });

  const getInfosFromWalletAddress = async (networkId = 1) => {
    setError(null);
    setIsLoading(true);
    const { provider } = networkMapper[networkId];
    const web3 = new Web3(provider);
    try {
      const balance = formatBalance(
        web3,
        await web3.eth.getBalance(walletAddress)
      );
      const { token } = networkMapper[networkId];
      setInfos({ networkId, token, balance, context: "wallet-address" });
    } catch (e) {
      console.log(e);
      setError(errors[2]);
    } finally {
      setIsLoading(false);
    }
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
                onClick={() => getInfosFromWalletAddress()}
                disabled={!!account}
              >
                Get info
              </Button>
            </div>
            <Button icon={metamask} onClick={active ? disconnect : connect}>
              {active ? "Disconect" : "Connect with Metamask"}
            </Button>
          </div>
          <Content
            infos={infos}
            getInfosFromWalletAddress={getInfosFromWalletAddress}
            isLoading={isLoading}
            error={error}
          />
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
