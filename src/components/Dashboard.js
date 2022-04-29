import Wallet from "./Wallet";
import Navigation from "./navigation";
import { ethers } from "ethers";
import { useState } from "react";
import React, { useEffect } from "react";
import FactStation from "../artifacts/contracts/FactStation.sol/FactStation.json";
import { Link } from "react-router-dom";

const factStationAddress = "0x0EB56421e8A5Ab7BFa097Ace6Db67fD9E6e23d04";

function Dashboard() {
  //const [imgs, setimgs] = useState({});
  //let imgItems = [];
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
            //console.log(txn);
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
        let id1 = parseInt(id.id, 10);
        console.log(typeof id1);
        //console.log(typeof post_status);
        let status_number = parseInt(post_status);
        //console.log(typeof status_number);
        const vote_tx = await contract.vote(id1, status_number);
        vote_tx.wait();
        console.log(vote_tx);
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
          {console.log(src)}

          {src.map((inde) => {
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
          <button className="card1">
            <Link to="/rew">
              <div>
                <p>Your History</p>
              </div>
            </Link>
          </button>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
