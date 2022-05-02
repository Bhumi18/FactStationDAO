import Button from "react-bootstrap/Button";
import React, { Component } from "react";
import Navigation from "./navigation";
import { useState, useEffect } from "react";
import { FileUpload } from "react-ipfs-uploader";
import { ethers } from "ethers";
import FactStation from "../artifacts/contracts/FactStation.sol/FactStation.json";

const factStationAddress = "0xfbcb89b8858B32bbC162447A263E8ca668933BCa";

function FileUploader() {
  const [fileUrl, setFileUrl] = useState("");
  console.log(process.env.REACT_APP_PRIVATEKEY);
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
      alert("Post Created !!!");
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
