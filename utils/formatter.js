import eth from "../public/eth.png";
import bnb from "../public/bnb.png";
import pol from "../public/pol.png";

const formatBalance = (providerInstance, balance) =>
  providerInstance.utils.fromWei(balance);

const moralisAccountToken = process.env.NEXT_PUBLIC_MORALIS_ACCOUNT_TOKEN;
const networkProviderBaseUrl = `https://speedy-nodes-nyc.moralis.io/${moralisAccountToken}`;

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
