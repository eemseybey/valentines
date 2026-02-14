import { Playfair_Display } from "next/font/google";

const playfairDisplay = Playfair_Display({
  display: "swap",
  subsets: ["latin"],
});

export default function TextFooter() {
  return (
    <>
      {/* Left Text */}
      <h1
        className={`absolute left-10 bottom-5 transform -translate-y-1/2 text-rose-50 text-4xl lg:text-5xl font-bold leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] ${playfairDisplay.className}`}
      >
        <span className="text-amber-200">Match</span> <br /> the photo pairs
      </h1>

      {/* Right Text */}
      <h1
        className={`absolute right-10 bottom-5 transform -translate-y-1/2 text-rose-50 text-4xl lg:text-5xl font-bold leading-tight text-right drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] ${playfairDisplay.className}`}
      >
        to reveal <br /> <span className="text-amber-200">the surprise</span>
      </h1>
    </>
  );
}
