import React, { useState, useEffect } from "react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";
import Web3Modal from "web3modal";
const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "9c48d1f781404552b1a017d597f6bee1",
    },
  },
};

const Web3Connection = () => {
  const [provider, setProvider] = useState();
  let web3Modal;
  React.useEffect(async () => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []);
  React.useEffect(() => {
    if (provider?.on) {
      console.log("fdsghg");
      // when user chain network
      provider.on("chainChanged", () => alert("chainChanged"));
      // when user account change
      provider.on("accountsChanged", () => alert("accounts Changed"));
      // provider.on("disconnect", () => alert("disconnect"));
    }
  }, [provider]);

  if (typeof window !== "undefined") {
    web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: true,
      providerOptions, // required
    });
  }

  // Wallet Connect Functionlity
  const connectWallet = async () => {
    let _provider = await web3Modal.connect();
    setProvider(_provider);
    const web3Provider = new providers.Web3Provider(_provider);
    const network = await web3Provider.getNetwork();
    const signer = web3Provider.getSigner();
    const address = await signer.getAddress();
  };

  // Wallet Disconnect Functionlity
  const disconnectWallet = async () => {
    await web3Modal.clearCachedProvider();
  };

  // MetamaskWallet Connect Functionlity
  const connectMetamaskWallet = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      console.log(account);
      const library = new providers.Web3Provider(window.ethereum, "any");
      console.log(library);
    } catch (ex) {
      console.log(ex);
    }
  };

  // MetamaskWallet Disconnect Functionlity
  const disconnectMetamaskWallet = () => {
    console.log("Disconnect to Metamask wallet...");
  };

  return (
    <div>
      <div className="flex flex-col h-[400px] justify-between  items-center">
        <button
          className="p-4 w-[300px] cursor-pointer text-white rounded bg-[#000]"
          onClick={connectWallet}
        >
          ConnectWallet
        </button>
        <button
          className="p-4 w-[300px]  cursor-pointer text-white rounded bg-[#000]"
          onClick={disconnectWallet}
        >
          DisconnectWallet
        </button>
        <button
          className="p-4 w-[300px] cursor-pointer text-white rounded bg-[#000]"
          onClick={connectMetamaskWallet}
        >
          ConnectMetamaskWallet
        </button>
        <button
          className="p-4 w-[300px]  cursor-pointer text-white rounded bg-[#000]"
          onClick={disconnectMetamaskWallet}
        >
          DisconnectMetamaskWallet
        </button>
      </div>
    </div>
  );
};

export default Web3Connection;
