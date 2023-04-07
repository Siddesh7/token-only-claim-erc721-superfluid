import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import bg from "../assets/bg.png";
import { deployer } from "../artifacts";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
function Hero() {
  const [formData, setFormData] = useState({
    contract: "",
    token: "",
    claimAmount: null,
    totalClaims: null,
  });
  const [totalValue, setTotalValue] = useState(null);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name == "totalClaims") {
      let totalTokens = value * formData.claimAmount;
      setTotalValue(totalTokens);
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleButtonClick = () => {
    console.log(totalValue);
    console.log(formData);
  };

  const { config } = usePrepareContractWrite({
    address: deployer.address,
    abi: deployer.abi,
    functionName: "deployStreamClaimable",
    args: [formData.contract, formData.token],
  });
  const { write } = useContractWrite(config);
  return (
    <div className="w-[95%] m-auto">
      {" "}
      <div>
        <div className="navbar bg-base-100 my-[20px]">
          <div className="flex-1">
            <a
              href="/"
              className="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-4xl font-black"
            >
              Stream Claim
            </a>
          </div>
          <div className="flex-none">
            <ConnectButton />
          </div>
        </div>
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
              Congratulations random Internet user!
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
              <input
                type="text"
                placeholder="Token that you're depositing for claim"
                className="input input-bordered input-primary w-full"
                name="token"
                value={formData.token}
                onChange={handleInputChange}
              />
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
              <button className="btn" onClick={handleButtonClick}>
                Create
              </button>
            </div>
          </label>
        </label>
      </div>
    </div>
  );
}

export default Hero;
