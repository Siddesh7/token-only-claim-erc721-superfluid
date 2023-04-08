import { useAccount, useContractRead } from "wagmi";
import { claimer, deployer } from "../../artifacts";
import Navbar from "../../components/Navbar";

export default function ClaimHome() {
  const { address } = useAccount();
  const { data, isError, isLoading } = useContractRead({
    address: deployer.address,
    abi: deployer.abi,
    functionName: "getUserStreamClaimables",
    args: [address],
  });
  console.log(data);
  return (
    <div className="w-[95%] m-auto">
      <Navbar />
      {data && (
        <div>
          <p className="text-bold text-[25px] ">Claims Created</p>
          <div className="my-[20px] flex flex-row flex-wrap justify-between gap-4">
            {data.map((item, index) => (
              <div className="card w-[22%] bg-gray-200 shadow-xl my-[20px]">
                <div className="card-body">
                  <h2 className="card-title">Claim {`#${index + 1}`}</h2>

                  <div className="card-actions justify-end">
                    <a href={`/claim/${item}`} className="btn btn-primary">
                      Click to see
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
