import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Navbar() {
  return (
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
  );
}
