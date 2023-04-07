import { useContractRead } from "wagmi";
import { claimer, deployer } from "../../artifacts";

export default function ClaimHome() {
  const { data, isError, isLoading } = useContractRead({
    address: deployer.address,
    abi: deployer.abi,
    functionName: "getUserStreamClaimables",
  });
  return <div></div>;
}
