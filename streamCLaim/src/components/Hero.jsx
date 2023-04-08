import React, { useState } from "react";
import bg from "../assets/bg.png";
import { deployer } from "../artifacts";
import { erc20ABI, useContractWrite, usePrepareContractWrite } from "wagmi";
import Navbar from "./Navbar";
import { useDebounce } from "../../utilities";
import SuccessPage from "./Success";
function Hero() {
  const [formData, setFormData] = useState({
    contract: "",
    token: "",
    claimAmount: null,
    totalClaims: null,
  });

  const [totalValue, setTotalValue] = useState(null);
  const [approved, setApproved] = useState(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name == "totalClaims") {
      let totalTokens = value * formData.claimAmount;
      setTotalValue(totalTokens);
    }
    setFormData({ ...formData, [name]: value });
  };

  const debounced = useDebounce(formData, 1000);
  const { config } = usePrepareContractWrite({
    address: deployer.address,
    abi: deployer.abi,
    functionName: "deployStreamClaimable",
    args: [
      formData.contract,
      formData.token,
      formData.totalClaims,
      formData.claimAmount,
      formData.claimAmount,
    ],
    enabled: Boolean(debounced),
  });
  const { writeAsync, isSuccess } = useContractWrite(config);
  const { config: approve } = usePrepareContractWrite({
    address: formData.token,
    abi: erc20ABI,
    functionName: "approve",
    args: [
      deployer.address,
      "100000000000000000000000000000000000000000000000",
    ],
  });
  const { write: approveTx, isSuccess: approveSuccess } =
    useContractWrite(approve);

  function delay(time) {
    setTimeout(() => {
      setApproved(true);
    }, time);
  }

  return (
    <div className="w-[95%] m-auto">
      {" "}
      <div className="hidden md:block">
        <Navbar />
        <div className="card w-1/2 bg-base-100 shadow-xl image-full m-auto mt-[40px]">
          <figure>
            <img src={bg} alt="bg" />
          </figure>
          <div className="card-body flex mt-[10%]">
            <h2 className=" text-white text-3xl">Create a claim??</h2>
            <p className="text-gray-300 text-[16px]">
              Fill this form and get a shareable link!!
            </p>
            <div className="card-actions justify-end">
              <label htmlFor="my-modal-4" className="btn btn-accent">
                Create Claim
              </label>{" "}
            </div>
          </div>
        </div>

        <input type="checkbox" id="my-modal-4" className="modal-toggle" />
        <label htmlFor="my-modal-4" className="modal cursor-pointer">
          <label className="modal-box relative" htmlFor="">
            <h3 className="text-lg font-bold my-[10px]">
              Fill the details to get started
            </h3>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="NFT Contract that is eligible for claim"
                className="input input-bordered input-primary w-full"
                name="contract"
                value={formData.contract}
                onChange={handleInputChange}
              />

              <select
                className="select select-primary w-full"
                onChange={handleInputChange}
                name="token"
              >
                <option disabled selected>
                  Token that you're depositing for claim
                </option>
                <option value={"0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f"}>
                  fDAIx
                </option>
                <option value={"0x918E0d5C96cAC79674E2D38066651212be3C9C48"}>
                  fTUSDx
                </option>
                <option value={"0x42bb40bF79730451B11f6De1CbA222F17b87Afd7"}>
                  fUSDCx
                </option>
              </select>
              <input
                type="number"
                placeholder="Claim Amount"
                className="input input-bordered input-primary w-full"
                name="claimAmount"
                value={formData.claimAmount}
                onChange={handleInputChange}
              />
              <input
                type="number"
                placeholder="Total claims"
                className="input input-bordered input-primary w-full"
                name="totalClaims"
                value={formData.totalClaims}
                onChange={handleInputChange}
              />
              {!approveSuccess ? (
                <button
                  className="btn"
                  onClick={() => {
                    approveTx();
                    delay(20000);
                  }}
                >
                  Approve{" "}
                </button>
              ) : (
                <button className="btn" onClick={writeAsync}>
                  {approved ? "Create" : "Loading...."}
                </button>
              )}
            </div>
          </label>
        </label>
      </div>
      {isSuccess && (
        <div className="hidden md:block">
          <SuccessPage page={"/claim"} />
        </div>
      )}
      <div className="md:hidden flex justify-center my-[50%]">
        <h2>This site is not optimised for Mobile</h2>
      </div>
    </div>
  );
}

export default Hero;
