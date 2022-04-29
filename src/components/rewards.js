import Wallet from "./Wallet";
import "../App.css";
import Navigation from "./navigation";
import { ethers } from "ethers";
import { Component, useState } from "react";
import React, { useEffect } from "react";
import FactStation from "../artifacts/contracts/FactStation.sol/FactStation.json";

const factStationAddress = "0x0EB56421e8A5Ab7BFa097Ace6Db67fD9E6e23d04";

function Rewards() {
  const [src, setsrc] = useState([]);
  const [marketItems, setMarketItems] = useState(null);
  const [isLoading, setLoading] = React.useState(true);
  const [vot, setvotes] = useState([]);

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
      const id_array = await contract.getMyVotedPostIds();
      for (let i = 0; i < id_array.length; i++) {
        const txn = await contract.getPost(id_array[i]);
        const txn1 = await contract.getMyVote(id_array[i]);
        let userVoted = "";
        let check = parseInt(txn1, 10);

        console.log(check);
        let cid = txn.CID;
        let status = txn.status;
        console.log(status);
        if (status === "Verified") {
          if (check === 1) {
            userVoted = "With";
          } else if (check === 2) {
            userVoted = "Against";
          }
        } else if (status === "Fake") {
          console.log(check);
          if (check === 1) {
            userVoted = "Against";
          } else if (check === 2) {
            userVoted = "With";
          }
        } else if (status === "Questionable") {
          if (check === 1) {
            userVoted = "Yes";
          } else if (check === 2) {
            userVoted = "No";
          }
        }
        console.log(userVoted);
        //console.log(typeof tv1);
        //vot.push(tv);
        src.push([status, cid, userVoted]);
      }
      console.log("  " + src[0]);
      console.log("  " + src[1]);
      console.log("  " + src[2]);
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
                return (
                  // <h1>hiiii</h1>
                  <div class="column">
                    <div class="card">
                      <img className="imgreward" src={index[1]}></img>;
                      <div className="status">Result : {index[0]}</div>
                      <div className="status">Your Vote : {index[2]}</div>
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
        {/* <div class="column">
              <div class="card">
                <div>
                  {" "}
                  <img className="img"></img>
                </div>
                <div>
                  <button className="withdrawbtn">Withdraw</button>
                </div>
              </div>
            </div> */}
      </>
    );
  } else {
    return (
      <>
        <Navigation />
        <Wallet />
        <div className="cards">
          <div class="row">
            <div class="column">
              <div class="card">
                <div> {/* <img className="img"></img> */}</div>
                <div className="status">Not voted</div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Rewards;
