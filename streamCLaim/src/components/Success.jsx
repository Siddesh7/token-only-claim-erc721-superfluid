import React, { useEffect, useState } from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
export default function SuccessPage({ page }) {
  const { width, height } = useWindowSize();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  function delay() {
    setTimeout(() => {
      setShouldRedirect(true);
    }, 10000);
  }
  const host = "https://claimer.siddesh.xyz";
  useEffect(() => {
    delay();
  }, []);
  return (
    <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-opacity-50 backdrop-filter backdrop-blur-lg">
      <h2 className="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-7xl font-black">
        Your transaction is successful
      </h2>
      <Confetti width={width} height={height} />
      {shouldRedirect && <div>{window.location.replace(`${host}${page}`)}</div>}
    </div>
  );
}
