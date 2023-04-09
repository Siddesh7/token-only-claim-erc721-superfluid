import { useAccount } from "wagmi";
import Landing from "../components/Landing";
import NftsOwned from "../components/NFTsOwned";
import Footer from "../components/Footer";

export default function HeroPage() {
  const { address } = useAccount();
  return (
    <>
      <Landing />
      {address && <NftsOwned />}
      <Footer />
    </>
  );
}
