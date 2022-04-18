import Button from "react-bootstrap/Button";
import React, { Component } from "react";
import Navigation from "./navigation";
import { useState, useEffect } from "react";
import { FileUpload } from "react-ipfs-uploader";
import { ethers } from "ethers";
import FactStation from "../artifacts/contracts/FactStation.sol/FactStation.json";
const factStationAddress = "0x767df7702C19a6aa51BB839C2AE871e76fc83845";

function FileUploader() {
  const [fileUrl, setFileUrl] = useState("");

  const createpost = async (e) => {
    if (typeof window.ethereum !== "undefined") {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        factStationAddress,
        FactStation.abi,
        signer
      );
      const tx = await contract.createPost(fileUrl, 0, 0, 0);
      tx.wait();
      console.log(fileUrl);
      setFileUrl("");
    }
  };
  return (
    <div className="container">
      <Navigation />
      <div className="box">
        <FileUpload setUrl={setFileUrl} />
        FileUrl :{" "}
        <a href={fileUrl} target="_blank" rel="noopener noreferrer">
          {fileUrl}
        </a>
      </div>

      <Button
        className="btnSubmit"
        variant="dark"
        onClick={(e) => createpost()}
      >
        Submit
      </Button>
    </div>
  );
}
export default FileUploader;
