import Wallet from "./Wallet";
import "../App.css";
import Navigation from "./navigation";
import { ethers } from "ethers";
import { Component, useState } from "react";
import React, { useEffect } from "react";
import FactStation from "../artifacts/contracts/FactStation.sol/FactStation.json";

const factStationAddress = "0xfbcb89b8858B32bbC162447A263E8ca668933BCa";

function Request() {
  const [src, setsrc] = useState([]);
  const [marketItems, setMarketItems] = useState(null);
  const [isLoading, setLoading] = React.useState(true);

  const userPosts = async () => {
    if (typeof window.ethereum !== "undefined") {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        factStationAddress,
        FactStation.abi,
        signer
      );
      const id_array = await contract.getMyPostsIds();
      // console.log(id_array);
      //console.log(id_array.length);
      for (let i = 0; i < id_array.length; i++) {
        // console.log(id_array[i]);
        const txn = await contract.getPost(id_array[i]);
        let cid = txn.CID;
        let status = txn.status;
        src.push([status, cid]);
      }
      console.log("  " + src[0]);
      console.log("  " + src[1]);
    }
    setsrc(src);
    setLoading(false);
  };
  // function sleep(time) {
  //   return new Promise((resolve) => setTimeout(resolve, time));
  // }

  useEffect(() => {
    // src && userPosts();
    // console.log("in");
    userPosts();
  }, []);

  // window.addEventListener("load", userPosts());

  // window.onload = function () {
  //   userPosts();
  // };

  if (isLoading) {
    return "loading";
  }

  if (src.length > 0) {
    return (
      <>
        <Navigation />
        <Wallet />
        <div className="cards">
          <div class="row">
            {/* <h3>Card 1</h3>  */}

            {/* {src[0]}
            {src[1]} */}

            <div>
              {src.map((index) => {
                console.log("hi");
                // console.log(",," + index[0]);
                // console.log(",," + index[1]);
                return (
                  // <h1>hiiii</h1>
                  <div class="column">
                    <div class="card">
                      <img className="img" src={index[1]}></img>;
                      <div className="status">{index[0]}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* <div class="column">
            <div class="card">
              <h3>Card 2</h3>
              <div>
                {" "}
                <img className="img" src={src[1]}></img>
              </div>
              <div className="status">Status</div>
            </div>
          </div> */}
            {/* <div class="column">
            <div class="card">
              <h3>Card 3</h3>
              <div>
                {" "}
                <img className="img" src={src[1]}></img>
              </div>
              <div className="status">Status</div>
            </div>
          </div> */}
            {/* <div class="column">
            <div class="card">
              <h3>Card 4</h3>
              <div>
                {" "}
                <img className="img"></img>
              </div>
              <div className="status">Status</div>
            </div>
          </div> */}
            {/* <div class="column">
            <div class="card">
              <h3>Card 5</h3>
              <div>
                {" "}
                <img className="img"></img>
              </div>
              <div className="status">Status</div>
            </div>
          </div> */}
            {/* <div class="column">
            <div class="card">
              <h3>Card 6</h3>
              <div>
                {" "}
                <img className="img"></img>
              </div>
              <div className="status">Status</div>
            </div>
          </div> */}
          </div>
        </div>
      </>
    );
  }
}
export default Request;
