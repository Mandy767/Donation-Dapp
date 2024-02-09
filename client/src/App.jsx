import { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  Container,
  Typography,
  Box,
  Stack,
  Divider,
  Button,
} from "@mui/material";
import abi from "./contractJson/donation.json";
import Give from "./components/Give";
import Memos from "./components/Memos";

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
      const contractAddress = "0x985b683123FF62ee826AfEeCCE09e2dd3F3091aE";
      const contractABI = abi.abi;

      try {
        const { ethereum } = window;
        const account = await ethereum.request({
          method: "eth_requestAccounts",
        });
        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
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
    <Container className="App">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Typography variant="h1">Donation Dapp</Typography>
        <div style={{ marginTop: 20 }}>
          <Button
            variant="outlined"
            sx={{ backgroundColor: "black", pointerEvents: "none" }}
          >
            <Typography variant="body2" style={{ color: "#fff" }}>
              <span className="text-black">Connected Account - {account}</span>
            </Typography>
          </Button>
          <Divider style={{ marginTop: 10 }} />
        </div>
      </Box>
      <Stack direction="row">
        <Give state={state} />
        <div sx={{ width: "200px" }}>
          <Memos state={state} />
        </div>
      </Stack>
    </Container>
  );
}

export default App;
