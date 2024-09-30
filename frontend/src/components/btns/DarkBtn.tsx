import { ReactNode } from "react";

export default function DarkBtn({children, onClick}:{children:ReactNode, onClick: ()=>void}) {
  return (
    <button className="bg-purple-400 rounded text-center py-2 px-4 font-bold text-white" onClick={onClick}>
     {children}
    </button>
  )
}
