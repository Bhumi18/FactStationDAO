import Wallet from "./Wallet";
import Navigation from "./navigation";
import { ethers } from "ethers";
import { useState } from "react";
import React, { useEffect } from "react";
import FactStation from "../artifacts/contracts/FactStation.sol/FactStation.json";

const factStationAddress = "0x767df7702C19a6aa51BB839C2AE871e76fc83845";

function Dashboard() {
  const [imgs, setimgs] = useState({});
  let imgItems = [];
  let post_status;
  const [id, setId] = useState("");
  const [src, setsrc] = useState([]);
  const [src1, setsrc1] = useState("");
  const [len, setlen] = useState("");

  const getPost = async () => {
    // let items = [];
    if (typeof window.ethereum !== "undefined") {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        factStationAddress,
        FactStation.abi,
        signer
      );
      //
      const total = await contract.getTotalPosts();
      //console.log(total);
      const total_voted = await contract.getMyVotedPostIds();
      //console.log(total_voted);
      for (let i = 1; i <= total; i++) {
        for (let j = 0; j <= total_voted.length; j++) {
          if (i != total_voted[j] || !total_voted[j]) {
            const txn = await contract.getPost(i);
            if (!txn.isVerified) {
              let cid = txn.CID;
              let postId = txn.postId;
              // console.log(cid);
              src.push([postId, cid]);
            }
          }
        }
      }
    }
    setlen(src.length);
  };

  useEffect(() => {
    getPost();
  }, []);

  const Radioevent = async () => {
    var ele = document.getElementsByName("button");

    for (let i = 0; i < ele.length; i++) {
      if (ele[i].checked) post_status = ele[i].value;
    }
    if (!post_status) {
      alert("please select one option");
    }
    //

    if (!id) {
      alert("Please Select the image !!!!");
    } else {
      if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          factStationAddress,
          FactStation.abi,
          signer
        );
        console.log("image id " + id.id);
        const vote_tx = await contract.vote(id, post_status);
        await vote_tx.wait();
      }
    }
  };

  // const accounts = await window.ethereum.request({ method: ‘eth_requestAccounts’ });
  // account = accounts[0];

  return (
    <>
      <Navigation />
      <Wallet />
      <div className="main-dash">
        <div className="first">
          {src.map((inde) => {
            console.log("in map");
            return (
              <img
                src={inde[1]}
                className="currentRequest"
                id={inde[0]}
                key={inde[0]}
                onClick={() => {
                  let src = inde[1];
                  let id = inde[0];
                  setsrc1({ src });
                  // console.log(id);
                  setId({ id });
                }}
              ></img>
            );
          })}
        </div>
        <div className="second">
          <div>
            <img
              src={src1[Object.keys(src1)]}
              id={id[Object.keys(id)]}
              className="preview"
              style={{ width: "700px", height: "400px" }}
            ></img>
          </div>

          <div className="btns">
            <div>
              <input type="radio" name="button" value="0" />{" "}
              <span className="btn-label">Rewoke</span>
              <input type="radio" name="button" value="1" />
              <span className="btn-label">True</span>
              <input type="radio" name="button" value="2" />{" "}
              <span className="btn-label">False</span>
            </div>
            <div className="submitbtn">
              <button onClick={() => Radioevent()}>Submit</button>
            </div>
          </div>
        </div>

        {/* </div> */}
        <div className="third">
          <div className="card1">
            <p>Your Rewards</p>
          </div>
          <div className="card2">
            <p>Your History</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
