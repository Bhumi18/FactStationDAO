import Button from "react-bootstrap/Button";
import React, { Component } from "react";
import { useState, useEffect } from "react";
import { FileUpload } from "react-ipfs-uploader";
import { ethers } from "ethers";
import { create, CID, IPFSHTTPClient } from "ipfs-http-client";

// const client = create("https://ipfs.infura.io:5001/api/v0");

function FileUploader() {
  let ipfs: IPFSHTTPClient | undefined;
  try {
    ipfs = create({
      url: "https://ipfs.infura.io:5001/api/v0",
    });
  } catch (error) {
    console.error("IPFS error ", error);
    ipfs = undefined;
  }
  // add this at the beginning of the App component
  const [images, setImages] = React.useState<{ cid: CID; path: string }[]>([]);
  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const files = (form[0] as HTMLInputElement).files;

    if (!files || files.length === 0) {
      return alert("No files selected");
    }

    const file = files[0];
    // upload files
    const result = await (ipfs as IPFSHTTPClient).add(file);

    setImages([
      ...images,
      {
        cid: result.cid,
        path: result.path,
      },
    ]);

    form.reset();
  };
  {
    ipfs && (
      <>
        <p>Upload File using IPFS</p>

        <form onSubmit={onSubmitHandler}>
          <input name="file" type="file" />

          <button type="submit">Upload File</button>
        </form>
      </>
    );
  }
  return (
    <div className="App">
      <header className="App-header">
        {!ipfs && (
          <p>Oh oh, Not connected to IPFS. Checkout out the logs for errors</p>
        )}
      </header>
    </div>
  );
}

export default FileUploader;
