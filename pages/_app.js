import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";
import "../styles/app.css";

const getLibrary = (provider) => new Web3(provider);

const MyApp = ({ Component, pageProps }) => (
  <Web3ReactProvider getLibrary={getLibrary}>
    <Component {...pageProps} />
  </Web3ReactProvider>
);

export default MyApp;
