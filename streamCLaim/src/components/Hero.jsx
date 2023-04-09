import React, { useEffect, useState } from "react";
import bg from "../assets/bg.png";
import { deployer } from "../artifacts";
import { erc20ABI, useContractWrite, usePrepareContractWrite } from "wagmi";

import { useDebounce } from "../../utilities";
import SuccessPage from "./Success";

import { useLocation } from "react-router-dom";

function Hero() {
  const [formData, setFormData] = useState({
    contract: "",
    token: "",
    claimAmount: null,
    totalClaims: null,
  });
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let modal = Boolean(searchParams.get("modal"));
  const addressOfNft = searchParams.get("address");
  const [totalValue, setTotalValue] = useState(null);
  const [approved, setApproved] = useState(false);
  const [closeModal, setCloseModal] = useState(false);
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
  function closeModalHandler() {
    setCloseModal(true);
  }
  useEffect(() => {
    if (addressOfNft) {
      setFormData({ ...formData, contract: addressOfNft });
    }
  }, [addressOfNft]);
  return (
    <>
      <div className="card w-[24%] bg-gray-100 shadow-xl h-[500px]">
        <figure className="px-10 pt-10" style={{ height: "50%" }}>
          <div
            style={{
              backgroundImage: `url(${bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
              height: "100%",
              width: "100%",
              borderRadius: "20px",
            }}
          ></div>
        </figure>

        <div
          className="card-body items-center text-center"
          style={{ height: "30%" }}
        >
          <h2 className="card-title">Create a new claim!</h2>
          <p>
            Cannot find the nft? Create it using the nft address! <br /> Fill
            this form and get a shareable link!!
          </p>
          <div className="card-actions w-full">
            <label htmlFor="my-modal-3" className="btn btn-accent w-full">
              Create Claim
            </label>{" "}
          </div>
        </div>
      </div>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className={`modal ${modal && !closeModal && `modal-open`}`}>
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={closeModalHandler}
          >
            ✕
          </label>
          <h3 className="text-lg font-bold mb-[20px]">
            You're about to create a new claim!
          </h3>
          <div className="flex flex-col gap-4">
            {!addressOfNft && (
              <input
                type="text"
                placeholder="NFT Contract that is eligible for claim"
                className="input input-bordered input-primary w-full"
                name="contract"
                value={formData.contract}
                onChange={handleInputChange}
                disabled={addressOfNft && true}
              />
            )}

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
          </div>{" "}
        </div>
      </div>
      {isSuccess && (
        <div className="hidden md:block">
          <SuccessPage page={"/claim"} />
        </div>
      )}
      <div className="md:hidden flex justify-center my-[50%]">
        <h2>This site is not optimised for Mobile</h2>
      </div>
    </>
  );
}

export default Hero;
