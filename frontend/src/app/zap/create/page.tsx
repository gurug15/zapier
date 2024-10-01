'use client'
import AppBar from "@/components/AppBar";
import DarkBtn from "@/components/btns/DarkBtn";
import SelectAction from "@/components/SelectAction";
import SelectTrigger from "@/components/SelectTrigger";
import ZapCell from "@/components/ZapCell";
import { useAvailableActionsNTrigger } from "@/hooks/useAvailableActionsNTrigger";
import Image from "next/image";
import { useState } from "react";


export default function Create() {
  const [selectedTrigger, setSelectedTrigger] = useState<{
       AvalableTriggerId: string,
      AvalableTriggerName: string
  }>()
  const [selectedActions, setSelectedActions]= useState<{
      index: number
      AvalableActionId: string,
      AvalableActionName: string
  }[]>([])
  const [selectedModalIndex, setSelectedModalIndex] = useState<null | number>(null)



  return (
    <div>
      <AppBar/>
      <div className="w-full min-h-screen bg-slate-200 flex flex-col justify-center items-center gap-y-2" >
      <ZapCell name={selectedTrigger?.AvalableTriggerName ? selectedTrigger.AvalableTriggerName : "Trigger"} index={1} onClick={()=>{
        setSelectedModalIndex(1)
      }} />
       <div className="w-full "> 
        {selectedActions.map((action, idx)=>{
            return <div key={idx} className="w-full flex justify-center">
              <ZapCell name={action.AvalableActionName ? action.AvalableActionName : "Action"} index={action.index} onClick={()=>setSelectedModalIndex(action.index)}/>
            </div>   
        })}
       </div>
       <DarkBtn onClick={()=>{
        setSelectedActions(a => [...a, {
          index: 2 + a.length,
          AvalableActionId: "",
          AvalableActionName: ""
        }])
       }}><span className="text-2xl pb-1">+</span></DarkBtn>
      </div>
      {selectedModalIndex && <Modal index={selectedModalIndex} 
                                    onSelect={(props: null | {name:string, id:string})=>{
                                     
                                       if(props === null){
                                        setSelectedModalIndex(null);
                                        return;
                                       }
                                       if(selectedModalIndex == 1){
                                        setSelectedTrigger({
                                          AvalableTriggerId: props.id,
                                          AvalableTriggerName: props.name
                                        })
                                       }else{
                                        setSelectedActions((a)=>{
                                            const newActions = [...a]
                                            newActions[selectedModalIndex-2]={
                                              index: selectedModalIndex,
                                              AvalableActionId: props.id,
                                              AvalableActionName: props.name,
                                            }
                                            return newActions
                                        })
                                       }


                                       setSelectedModalIndex(null)

                                    }} />}
    </div>
  )
}




function Modal({index,onSelect}:{index:number,onSelect:(props: null | {name:string,id:string})=>void}){
  const {availableActions,availableTrigger,loading} = useAvailableActionsNTrigger()
  console.log(availableActions)
  return <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
  <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <Image width={20} height={20} src="https://www.svgrepo.com/show/507892/zap.svg" alt="Logo"/>
            </div>
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">{index == 1 ? "Select Trigger" : "Select Action"}</h3>
              <div className="mt-2">
                 { index ==1 ? <SelectTrigger avalableTriggers={availableTrigger}/> : <SelectAction availableActions={availableActions}/>}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button type="button"  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Deactivate</button>
          <button type="button" onClick={()=>{
            onSelect(null)
          }} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</div>
}
