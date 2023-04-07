export const deployer = {
  address: "0x4EFAF25265a5E2264622EE35f560E27c784E100c",
  abi: [
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
      inputs: [],
      name: "claimStream",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
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
      stateMutability: "payable",
      type: "receive",
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
  ],
};
