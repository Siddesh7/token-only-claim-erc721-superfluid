import { useParams } from "react-router-dom";
import { useAccount } from "wagmi";

export default function Claim() {
  const { id } = useParams();
  const { address } = useAccount;
  const { data, isError, isLoading } = useContractRead({
    address: address,
    abi: claimer.abi,
    functionName: "getHunger",
  });

  return (
    <div>
      <h4>
        This claim requires you to hold 1 NFT from this contract {contract}.
      </h4>
      <p>Amount claimable as stream: {amount}</p>
    </div>
  );
}
