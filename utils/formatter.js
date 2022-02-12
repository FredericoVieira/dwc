import getConfig from "next/config";
import eth from "../public/eth.png";
import bnb from "../public/bnb.png";
import pol from "../public/pol.png";

const formatBalance = (providerInstance, balance) =>
  providerInstance.utils.fromWei(balance);

const { publicRuntimeConfig } = getConfig();
const networkProviderBaseUrl = `https://speedy-nodes-nyc.moralis.io/${publicRuntimeConfig.moralisAccountToken}`;

const networkMapper = {
  1: {
    network: "Ethereum",
    token: "ETH",
    logo: eth,
    provider: `${networkProviderBaseUrl}/eth/mainnet`,
  },
  56: {
    network: "Binance Smart Chain",
    token: "BNB",
    logo: bnb,
    provider: `${networkProviderBaseUrl}/bsc/mainnet`,
  },
  137: {
    network: "Polygon",
    token: "MATIC",
    logo: pol,
    provider: `${networkProviderBaseUrl}/polygon/mainnet`,
  },
};

export { formatBalance, networkMapper };
