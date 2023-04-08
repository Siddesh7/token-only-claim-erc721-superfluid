import { useParams, useSearchParams } from "react-router-dom";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { claimer } from "../../artifacts";
import Navbar from "../../components/Navbar";
import { ethers } from "ethers";
import { calculateAmountFromFlowRate, getTokenName } from "../../../utilities";
import SuccessPage from "../../components/Success";

export default function Claim() {
  const { id } = useParams();
  const { address } = useAccount();
  const { data, isLoading } = useContractRead({
    address: id,
    abi: claimer.abi,
    functionName: "getContractDetails",
  });
  const { data: hasClaimed } = useContractRead({
    address: id,
    abi: claimer.abi,
    functionName: "hasUserClaimed",
    args: [address],
  });

  const { config } = usePrepareContractWrite({
    address: id,
    abi: claimer.abi,
    functionName: "claimStream",
  });

  const { write, isSuccess, isError } = useContractWrite(config);
  return (
    <>
      <div className="w-[95%] m-auto">
        <Navbar />
        <div className="flex flex-col justify-center items-center my-[30px]">
          {data && (
            <p className="text-[20px] text-bold my-[20px]">
              You can Claim this if you have an NFT from this collection{" "}
              <a
                href={`https://testnets.opensea.io/assets/mumbai/${data[0]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] text-secondary"
              >
                {` ${data[0]}`}.
              </a>{" "}
            </p>
          )}
          {data ? (
            <div>
              {" "}
              <div className="stats shadow bg-gray-200">
                <div className="stat place-items-center">
                  <div className="stat-title">Asset Claimable</div>
                  <div className="stat-value text-secondary">
                    <a
                      href={`http://mumbai.polygonscan.com/address/${data[1]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {getTokenName(data[1])}
                    </a>
                  </div>
                  <div className="stat-desc">Streamable asset</div>
                </div>
                <div className="stat place-items-center">
                  <div className="stat-title">Claimable amount/user</div>
                  <div className="stat-value">
                    {calculateAmountFromFlowRate(
                      ethers.BigNumber.from(data[2]).toNumber()
                    )}
                    /mo
                  </div>
                  <div className="stat-desc">Stream will be created</div>
                </div>
                <div className="stat place-items-center">
                  <div className="stat-title">Total Claims</div>
                  <div className="stat-value">
                    {ethers.BigNumber.from(data[3]).toNumber()}
                  </div>
                  <div className="stat-desc">
                    The total number of times this can be claimed!
                  </div>
                </div>

                <div className="stat place-items-center">
                  <div className="stat-title">Available claims</div>
                  <div className="stat-value text-secondary">
                    {" "}
                    {ethers.BigNumber.from(data[3]).toNumber() -
                      ethers.BigNumber.from(data[4]).toNumber()}
                  </div>
                  <div className="stat-desc">
                    ↘︎ if it is 0, you can't claim
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div class="w-4/6 h-24 rounded-md mx-auto mt-20">
              <div class="flex animate-pulse flex-row items-center justify-center h-full space-x-5">
                <div class="w-12 bg-gray-300 h-12 rounded-full "></div>
                <div class="flex flex-col space-y-3">
                  <div class="w-96 bg-gray-300 h-6 rounded-md "></div>
                  <div class="w-5/6 bg-gray-300 h-6 rounded-md "></div>
                </div>
              </div>
              <div class="flex animate-pulse flex-row items-center justify-center h-full space-x-5">
                <div class="w-12 bg-gray-300 h-12 rounded-full "></div>
                <div class="flex flex-col space-y-3">
                  <div class="w-96 bg-gray-300 h-6 rounded-md "></div>
                  <div class="w-5/6 bg-gray-300 h-6 rounded-md "></div>
                </div>
              </div>
              <div class="flex animate-pulse flex-row items-center justify-center h-full space-x-5">
                <div class="w-12 bg-gray-300 h-12 rounded-full "></div>
                <div class="flex flex-col space-y-3">
                  <div class="w-96 bg-gray-300 h-6 rounded-md "></div>
                  <div class="w-5/6 bg-gray-300 h-6 rounded-md "></div>
                </div>
              </div>
            </div>
          )}
          {data && (
            <div>
              {!hasClaimed ? (
                <button className="btn mt-[40px]" onClick={write}>
                  Check Eligibility and Claim
                </button>
              ) : (
                <button className="btn mt-[40px]" onClick={write} disabled>
                  You have already claimed!
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      {isSuccess && <SuccessPage page="/" />}
    </>
  );
}
