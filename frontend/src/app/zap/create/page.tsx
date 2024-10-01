'use client'
import AppBar from "@/components/AppBar";
import DarkBtn from "@/components/btns/DarkBtn";
import ZapCell from "@/components/ZapCell";
import { useState } from "react";


export default function Create() {
  const [selectedTrigger, setSelectedTrigger] = useState("")
  const [selectedActions, setSelectedActions]= useState<{
      AvalableActionId: string,
      AvalableActionName: string
  }[]>([])
  return (
    <div>
      <AppBar/>
      <div className="w-full min-h-screen bg-slate-200 flex flex-col justify-center items-center gap-y-2">
      <ZapCell name={selectedTrigger ? selectedTrigger : "Trigger"} index={1}/>
       <div className="w-full "> 
        {selectedActions.map((action, idx)=>{
            return <div key={idx} className="w-full flex justify-center">
              <ZapCell name={action.AvalableActionName ? action.AvalableActionName : "Action"} index={2+idx} />
            </div>   
        })}
       </div>
       <DarkBtn onClick={()=>{
        setSelectedActions(a => [...a, {
          AvalableActionId: "",
          AvalableActionName: ""
        }])
       }}><span className="text-2xl pb-1">+</span></DarkBtn>
      </div>
    </div>
  )
}
