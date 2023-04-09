import { ConnectButton } from "@rainbow-me/rainbowkit";
import Navbar from "./Navbar";
import { useState } from "react";
import { useAccount } from "wagmi";

export default function Landing() {
  const { address } = useAccount();
  return (
    <div className="w-[95%] m-auto">
      <Navbar />
      <div className="hero min-h-[50vh]">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello Fren!</h1>
            <p className="py-6">
              Create a claim for your fav NFT community or claim one with your
              nft!
            </p>

            {address ? (
              <a className="btn btn-primary" href={"#nft"}>
                Get Started
              </a>
            ) : (
              <div className="flex justify-center">
                <ConnectButton />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
