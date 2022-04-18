import React, { Component } from "react";
import Navigation from "../components/navigation";
import { ethers } from "ethers";
import FactStation from "../artifacts/contracts/FactStation.sol/FactStation.json";
import fsToken from "../artifacts/contracts/FSToken.sol/FSToken.json";
import { useState, useEffect } from "react";

const factStationAddress = "0x767df7702C19a6aa51BB839C2AE871e76fc83845";
const fsTokenAddress = "0xd64DB5e13532838e0D7c4431B345e29eA3cC376e";

function Member() {
  const [noOfTokens, setNoOfTokens] = useState(0);
  const buyTokens = async (e) => {
    if (typeof window.ethereum !== "undefined") {
      console.log(noOfTokens);

      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        factStationAddress,
        FactStation.abi,
        signer
      );
      //
      const fsTokenContract = new ethers.Contract(
        fsTokenAddress,
        fsToken.abi,
        signer
      );
      const tokenPrice = await fsTokenContract.getTokenPrice();
      console.log(tokenPrice);
      const txn = await contract.buyTokens(noOfTokens, {
        value: noOfTokens * tokenPrice,
      });
      await txn.wait();
      console.log("hey");
    }
  };

  return (
    <div className="memberform">
      <Navigation />
      <form className="form">
        <label>
          Enter No. of Tokens
          <br />
          <input
            className=" inputform"
            type="text"
            name="name"
            id="userTokens"
            onChange={(event) => setNoOfTokens(event.target.value)}
          />
        </label>
        <br />
        <input
          className=" submitform"
          type="button"
          value="Submit"
          onClick={(e) => buyTokens()}
        />
      </form>
    </div>
  );
}

export default Member;
