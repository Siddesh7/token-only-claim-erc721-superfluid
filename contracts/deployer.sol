// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {StreamClaimable} from "./tokenSuperfluid.sol";
import {ISuperToken} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperToken.sol";
import {ISuperfluid} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

interface IERC20 {
    function decimals() external view returns (uint8);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);
}

contract Deployer {
    ISuperfluid private superfluid;
    address private owner;
    ISuperToken private token;
    mapping(address => address[]) public userStreamClaimables;

    constructor() payable {}

    function calculateFlowRate(
        int96 amountInEther
    ) public view returns (int96) {
        require(amountInEther > 0, "Amount must be greater than zero");
        int96 monthlyAmount = amountInEther * 10 ** 18;
        int96 calculatedFlowRate = monthlyAmount / 2628000; // 3600 * 24 * 30
        return calculatedFlowRate;
    }

    function deployStreamClaimable(
        address _nftContractAdd,
        address _tokenAdd,
        uint256 _totalClaims,
        uint256 _claimPerUser,
        int96 _flowRateMonth
    ) external {
        int96 flowRate = calculateFlowRate(_flowRateMonth);
        token = ISuperToken(_tokenAdd);
        IERC20 tokenUsed = IERC20(_tokenAdd);
        StreamClaimable streamClaimable = new StreamClaimable(
            _nftContractAdd,
            token,
            flowRate,
            _totalClaims
        );
        uint8 decimalsOfToken = tokenUsed.decimals();
        uint256 amount = _totalClaims * _claimPerUser * 10 ** decimalsOfToken;
        IERC20(_tokenAdd).transferFrom(
            msg.sender,
            address(streamClaimable),
            amount
        );
        // Transfer Matic to the StreamClaimable contract
        payable(address(streamClaimable)).transfer(0.001 ether);

        // Record the deployed StreamClaimable contract address for the user
        userStreamClaimables[msg.sender].push(address(streamClaimable));
    }

    // Function to retrieve the StreamClaimable contracts deployed by a user
    function getUserStreamClaimables(
        address user
    ) external view returns (address[] memory) {
        return userStreamClaimables[user];
    }
}
