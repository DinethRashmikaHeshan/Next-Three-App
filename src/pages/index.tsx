import Image from "next/image";
import localFont from "next/font/local";
import ThreeDModel from "@/pages/component/ThreeModel";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
      <div className="w-1/2">
        <h1>3D Model Example</h1>
        <ThreeDModel/>
      </div>
  );
}
