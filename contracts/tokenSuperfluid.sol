// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {ISuperToken} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperToken.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {SuperTokenV1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol";
import {ISuperfluid} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

contract StreamClaimable {
    using SuperTokenV1Library for ISuperToken;
    ISuperToken public token;
    int96 public flowRate;
    IERC721 public nftContract;
    uint256 public totalClaims;
    uint256 public timesClaimed;
    mapping(address => bool) public hasClaimed;

    constructor(
        address _nftContract,
        ISuperToken _token,
        int96 _flowRate,
        uint256 _totalClaims
    ) payable {
        nftContract = IERC721(_nftContract);
        token = _token;
        flowRate = _flowRate;
        totalClaims = _totalClaims;
        timesClaimed = 0;
    }

    receive() external payable {}

    fallback() external payable {}

    function checkHoldings(address _user) public view returns (bool) {
        uint256 balanceOfUser = nftContract.balanceOf(_user);
        if (
            balanceOfUser > 0 &&
            timesClaimed < totalClaims &&
            !hasClaimed[_user]
        ) {
            return true;
        } else {
            return false;
        }
    }

    function claimStream() public {
        bool status = checkHoldings(msg.sender);
        if (status) {
            token.createFlow(msg.sender, flowRate);
            timesClaimed++;
            hasClaimed[msg.sender] = true;
        }
    }
}
