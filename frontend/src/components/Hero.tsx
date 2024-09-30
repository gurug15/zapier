"use client"
import { useRouter } from "next/navigation";
import HeroVideo from "./HeroVideo";

export default function Hero() {
  const router = useRouter();
  return (
    <div className="w-screen flex justify-center mt-11">
      <div className="flex flex-col justify-center items-center w-10/12">
      <div className="text-6xl font-bold w-8/12 text-center">
      Automate as fast as you can type
      </div>
      <div className="text-2xl font-semibold w-10/12 text-center mt-5">
      Automate tasks effortlessly with our platform. Set triggers that perform actions automatically, streamlining your workflow and saving time on repetitive tasks.
      </div>
      <div className="mt-4">
        <button onClick={()=>{
          router.push("/signup")
        }} className="bg-orange-500 text-white font-bold text-xl w-full px-7 py-3 rounded-full hover:drop-shadow-xl cursor-pointer">
        Start free with email
        </button>
      </div>
      <HeroVideo/>
      </div>
    </div>
  )
}
