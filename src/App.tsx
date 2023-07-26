import { useMemo, useState } from "react";
import babt from "./BABT.json";
import Web3 from "web3";

export default function App() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(null);
  const [msg, setMsg] = useState("");

  const contract = useMemo(() => {
    const web3 = new Web3(
      new Web3.providers.HttpProvider(
        "https://data-seed-prebsc-1-s1.binance.org:8545"
      )
    );
    const { abi } = babt;

    return new web3.eth.Contract(
      abi as any,
      "0x2B09d47D550061f995A3b5C6F0Fd58005215D7c8"
    );
  }, []);

  const handleQuery = async () => {
    setMsg("");

    try {
      const userBalance = await contract.methods.balanceOf(address).call();
      setBalance(userBalance);
    } catch (err) {
      console.error(err);
    }
  };

  const handleConnect = async () => {
    if (typeof window.ethereum === "undefined") {
      setMsg("Metamask is not installed.");
      return;
    }

    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    console.log(accounts);
    if (accounts[0]) {
      setAddress(accounts[0]);
    }
  };

  return (
    <div className="App">
      <h1>Hello BAB Token</h1>
      <input
        placeholder="Please enter an address"
        value={address}
        onChange={(event) => setAddress(event.target.value)}
      />

      <button style={{ marginLeft: 8 }} onClick={handleConnect}>
        Connect
      </button>

      <button style={{ marginLeft: 8 }} onClick={handleQuery}>
        Query Balance
      </button>

      {msg && <h2>{msg}</h2>}
      {balance !== null && <h2>balance: {balance}</h2>}
    </div>
  );
}
