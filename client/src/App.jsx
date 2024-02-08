import { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState("Not Connected");

  useEffect(() => {
    const template = async () => {
      const contractAddress = "";
      const contractABI = "";

      try {
        const { ethereum } = window;
        const account = await ethereum.request({
          method: "eth_requestAccounts",
        });

        setAccount(account);

        const provider = new ethers.providers.Web3Provider(ethereum); //read the blockchain
        const signer = provider.getSigner(); //write the blockchain

        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        setState({ provider, signer, contract });
      } catch (err) {
        console.log(err);
      }
    };

    template();
  });

  return (
    <>
      <div>Hii</div>
    </>
  );
}

export default App;
