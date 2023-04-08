export const deployer = {
  address: "0x19085c868cC66E4830452A7e9aba4E329ab48b4e",
  abi: [
    {
      inputs: [],
      stateMutability: "payable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "int96",
          name: "amountInEther",
          type: "int96",
        },
      ],
      name: "calculateFlowRate",
      outputs: [
        {
          internalType: "int96",
          name: "",
          type: "int96",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_nftContractAdd",
          type: "address",
        },
        {
          internalType: "address",
          name: "_tokenAdd",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_totalClaims",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_claimPerUser",
          type: "uint256",
        },
        {
          internalType: "int96",
          name: "_flowRateMonth",
          type: "int96",
        },
      ],
      name: "deployStreamClaimable",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "user",
          type: "address",
        },
      ],
      name: "getUserStreamClaimables",
      outputs: [
        {
          internalType: "address[]",
          name: "",
          type: "address[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "userStreamClaimables",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
};
export const claimer = {
  abi: [
    {
      inputs: [
        {
          internalType: "address",
          name: "_nftContract",
          type: "address",
        },
        {
          internalType: "contract ISuperToken",
          name: "_token",
          type: "address",
        },
        {
          internalType: "int96",
          name: "_flowRate",
          type: "int96",
        },
        {
          internalType: "uint256",
          name: "_totalClaims",
          type: "uint256",
        },
      ],
      stateMutability: "payable",
      type: "constructor",
    },
    {
      stateMutability: "payable",
      type: "fallback",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_user",
          type: "address",
        },
      ],
      name: "checkHoldings",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "claimStream",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "claimedAddresses",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "flowRate",
      outputs: [
        {
          internalType: "int96",
          name: "",
          type: "int96",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getClaimedAddresses",
      outputs: [
        {
          internalType: "address[]",
          name: "",
          type: "address[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getContractDetails",
      outputs: [
        {
          internalType: "address",
          name: "_nftContract",
          type: "address",
        },
        {
          internalType: "address",
          name: "_token",
          type: "address",
        },
        {
          internalType: "int96",
          name: "_flowRate",
          type: "int96",
        },
        {
          internalType: "uint256",
          name: "_totalClaims",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_timesClaimed",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "hasClaimed",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_user",
          type: "address",
        },
      ],
      name: "hasUserClaimed",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "nftContract",
      outputs: [
        {
          internalType: "contract IERC721",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "timesClaimed",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "token",
      outputs: [
        {
          internalType: "contract ISuperToken",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalClaims",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      stateMutability: "payable",
      type: "receive",
    },
  ],
};
