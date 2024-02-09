import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
} from "@mui/material";

const Memos = ({ state }) => {
  const [memos, setMemos] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const fetchMemos = async () => {
      if (contract) {
        const memos = await contract.getMemos();
        setMemos(memos);
      }
    };
    fetchMemos();
  }, [contract]);

  return (
    <div className="container-fluid" sx={{ border: "1px solid black" }}>
      <h3 style={{ textAlign: "center", marginTop: "50px" }}>Transactions</h3>
      <Divider />
      <TableContainer
        component={Paper}
        style={{ maxHeight: "400px", overflowY: "scroll" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>From</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {memos.map((memo, index) => (
              <TableRow key={index}>
                <TableCell>{memo.name}</TableCell>
                <TableCell>
                  {new Date(memo.timestamp * 1000).toLocaleString()}
                </TableCell>
                <TableCell>{memo.message}</TableCell>
                <TableCell>{memo.from}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Memos;
