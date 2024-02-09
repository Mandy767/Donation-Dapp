import React, { useState } from "react";
import {
  Typography,
  Grid,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { ethers } from "ethers";

function Give({ state }) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const giveDonation = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { contract } = state;
    const amount = { value: ethers.utils.parseEther("0.001") };
    try {
      const transaction = await contract.giveDonation(name, message, amount);
      await transaction.wait();
      alert("Transaction is successful");
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid
      container
      spacing={3}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item>
        <Typography variant="h5" sx={{ fontWeight: "bold" }} gutterBottom>
          Please Donate !!!
        </Typography>
      </Grid>
      <Grid item>
        <form onSubmit={giveDonation}>
          <Grid container spacing={2} direction="column" alignItems="center">
            <Grid item>
              <TextField
                id="name"
                label="Name"
                variant="outlined"
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
                sx={{ width: "300px" }}
              />
            </Grid>
            <Grid item>
              <TextField
                id="message"
                label="Message"
                variant="outlined"
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                required
                sx={{ width: "300px" }}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!state.contract || loading}
              >
                {loading ? <CircularProgress size={24} /> : "Donate"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}

export default Give;
