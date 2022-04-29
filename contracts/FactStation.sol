// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

/// @title Smart Contract for Fact Station DAO. (Apr 8, 2022)
/// @author Manav Vagdoda (vagdonic.github.io)

import "./FSToken.sol";

contract FactStation {
    constructor() {
        owner = msg.sender;
    }

    address owner;
    uint256 public postIdCounter;
    uint256 public expertIdCounter;
    uint256 public tokensSold;
    mapping(address => bool) isExpert;
    mapping(uint256 => Posts) posts;
    mapping(address => uint256[]) myPosts;
    mapping(address => uint256[]) myVotedPosts;
    mapping(uint256 => Expert) expert;
    mapping(address => mapping(uint256 => uint256)) myVote;
    uint256 openForVoteTime = 180;

    mapping(address => mapping(uint256 => bool)) hasVoted;

    event Sell(address _buyer, uint256 _amount);

    event postCreated(uint256 indexed _postId, uint256 indexed _totalVotes);

    FSToken s = FSToken(0xbF0F1288b77e01113DceA826F1d8BA44e0908287);

    struct Posts {
        uint256 postId;
        address creator;
        uint256 timeCreated;
        uint256 closingTime;
        string CID;
        uint256 totalVotes;
        uint256 yesVotes;
        uint256 noVotes;
        bool isVerified;
        string status; // Verified, Fake, Questionable, Pending
    }

    struct Expert {
        uint256 expertId;
        address expertAddress;
    }

    modifier onlyAdmin() {
        require(msg.sender == owner);
        _;
    }

    modifier onlyExpert() {
        require(isExpert[msg.sender]);
        _;
    }

    modifier votedCheck(uint256 _id) {
        require(hasVoted[msg.sender][_id] == false, "You have already voted.");
        _;
    }

    modifier checkMember() {
        require(isExpert[msg.sender], "Join the DAO to cast your votes.");
        _;
    }

    function createPost(
        string memory _CID,
        uint256 _totalVotes,
        uint256 _yesVotes,
        uint256 _noVotes
    ) public {
        postIdCounter += 1;
        posts[postIdCounter] = Posts(
            postIdCounter,
            msg.sender,
            block.timestamp,
            (block.timestamp + openForVoteTime),
            _CID,
            _totalVotes,
            _yesVotes,
            _noVotes,
            false,
            "Pending"
        );
        myPosts[msg.sender].push(postIdCounter);
        emit postCreated(postIdCounter, _totalVotes);
    }

    function buyTokens(uint256 _numberOfTokens) public payable {
        require(
            msg.value == (_numberOfTokens * s.getTokenPrice()),
            "not enough value"
        );
        require(s.checkBalance() >= _numberOfTokens, "not enough token");
        s.transfer(msg.sender, _numberOfTokens);
        tokensSold += _numberOfTokens;
        emit Sell(msg.sender, _numberOfTokens);

        expertIdCounter += 1;
        expert[expertIdCounter] = Expert(expertIdCounter, msg.sender);
        isExpert[msg.sender] = true;
    }

    function vote(uint256 _id, uint256 _status)
        public
        checkMember
        votedCheck(_id)
    {
        // require(
        //     block.timestamp < posts[_id].closingTime &&
        //         block.timestamp > posts[_id].timeCreated
        // );
        // require(_status != 0);
        if (_status == 1) {
            posts[_id].yesVotes += 1;
            posts[_id].totalVotes += 1;
        } else if (_status == 2) {
            posts[_id].noVotes += 1;
            posts[_id].totalVotes += 1;
        }
        myVotedPosts[msg.sender].push(_id);
        myVote[msg.sender][_id] = _status;
        hasVoted[msg.sender][_id] = true;
    }

    function decision(uint256 _id) public {
        //require(block.timestamp > posts[_id].closingTime);
        require(posts[_id].isVerified == false, "Decision is made already.");
        if (posts[_id].totalVotes == 0) {
            posts[_id].status = "Questionable";
        } else if (((posts[_id].yesVotes / posts[_id].totalVotes) * 100) > 80) {
            posts[_id].status = "Verified";
        } else if (((posts[_id].noVotes / posts[_id].totalVotes) * 100) > 80) {
            posts[_id].status = "Fake";
        }

        posts[_id].isVerified = true;
    }

    function getMyPostsIds() public view returns (uint256[] memory) {
        return myPosts[msg.sender];
    }

    function getMyVotedPostIds() public view returns (uint256[] memory) {
        return myVotedPosts[msg.sender];
    }

    function getPost(uint256 _id) public view returns (Posts memory) {
        return posts[_id];
    }

    function getMyVote(uint256 _id) public view returns (uint256) {
        return myVote[msg.sender][_id];
    }

    function getTotalPosts() public view returns (uint256) {
        return postIdCounter;
    }
}
