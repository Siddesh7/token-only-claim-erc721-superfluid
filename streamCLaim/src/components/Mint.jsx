import React from "react";
import { erc721ABI, useContractWrite, usePrepareContractWrite } from "wagmi";
import { nftMinterAbi } from "../artifacts";
import SuccessPage from "./Success";

const Mint = () => {
  const { config } = usePrepareContractWrite({
    address: "0xD3800A859b0684BB60687Fa71049c9C3D963F8D5",
    abi: nftMinterAbi,
    functionName: "safeMint",
  });
  const { write, isSuccess } = useContractWrite(config);
  return (
    <div className="text-center my-[80px]">
      <h1 className="text-3xl font-bold">Test the app!</h1>
      <p className="mt-4 mb-8 text-gray-500">
        Mint this nft and Claim a stream!
      </p>
      <button className="btn " onClick={write}>
        Mint
      </button>
      {isSuccess && (
        <SuccessPage
          page={"/claim/0x0Fc3419a423Be55f728eeF7Af3EF79878813929C"}
        />
      )}
    </div>
  );
};

export default Mint;
