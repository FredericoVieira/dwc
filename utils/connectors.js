import { InjectedConnector } from "@web3-react/injected-connector";

const Metamask = new InjectedConnector({
  supportedChainIds: [1, 56, 137],
});

export default Metamask;
