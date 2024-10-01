"use client"
//import useFetchUser from "@/hooks/useFetchUser";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AppBar() {
  const router = useRouter();
  return (
    <div className="sticky top-0 left-0 right-0 flex justify-between border-b px-10 z-50 backdrop-blur-sm bg-white">
     <div className="pt-3">
     <Image width={0} height={0} className="w-[105px] h-[28px]" src="https://res.cloudinary.com/zapier-media/image/upload/q_auto/v1685628568/Zapier%20logos/zapier-logo-no-space_hihmgg.svg" alt="Logo"/>
     </div>
      <div className=" flex justify-normal gap-x-3 mt-2">
        <button onClick={()=>{
          router.push("/login")
        }} className="bg-white border-none hover:bg-gray-200 rounded-md w-30 px-2 py-2 mb-2 ">
               Log in
        </button>
        <button onClick={()=>{
          router.push("/signup")
        }} className=" bg-orange-500 hover:drop-shadow-xl rounded-full w-30 h-8 mt-1 px-4 mb-2 text-white font-bold cursor-pointer">
              Sign up
        </button>
      </div> 
    </div>
  )
}
