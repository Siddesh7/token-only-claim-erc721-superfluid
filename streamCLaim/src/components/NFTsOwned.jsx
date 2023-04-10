import axios from "axios";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import NftContainer from "./NftContainer";
import Hero from "./Hero";

export default function NftsOwned() {
  const { address } = useAccount();
  const url = `${import.meta.env.VITE_ALCHEMY_URL}/getNFTs/?owner=${address}`;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const config = {
    method: "get",
    url: url,
  };

  function extractDataFromArray(responseArray) {
    const result = [];
    const uniqueAddresses = new Set();

    responseArray.forEach((response) => {
      const contract = {
        address: response.contract.address,
      };

      if (!uniqueAddresses.has(contract.address)) {
        uniqueAddresses.add(contract.address);

        const media = response.media[0];

        if (media && media.thumbnail !== undefined) {
          const metadata = {
            name: response.metadata.name,
            description: response.metadata.description,
            image: media.raw,
            thumbnail: media.thumbnail,
          };

          result.push({ contract, metadata });
        }
      }
    });

    return result;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(config);
        const extractedData = extractDataFromArray(
          response["data"]["ownedNfts"]
        );
        setData(extractedData);
        setLoading(false);
        console.log(extractedData);
      } catch (error) {
        console.log("error", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-[90%] m-auto">
      <h2 className="text-3xl font-black my-[20px]">
        NFTs Collection that you own!
      </h2>{" "}
      <div id="nft" className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Hero />
        {!loading &&
          data.length > 0 &&
          data.map((nft, index) => (
            <NftContainer
              key={index}
              address={nft.contract.address}
              image={nft.metadata.thumbnail}
              name={nft.metadata.name}
              desc={nft.metadata.description}
            />
          ))}
      </div>
    </div>
  );
}
