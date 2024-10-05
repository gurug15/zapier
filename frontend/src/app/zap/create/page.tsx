'use client'
import { BACKEND_URL } from "@/app/config";
import AppBar from "@/components/AppBar";
import DarkBtn from "@/components/btns/DarkBtn";
import ZapCell from "@/components/ZapCell";
import { AvailableItemType, useAvailableActionsNTrigger } from "@/hooks/useAvailableActionsNTrigger";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Create() {
  const router = useRouter();
  const [selectedTrigger, setSelectedTrigger] = useState<{
       id: string,
      name: string
  }>()
  const [selectedActions, setSelectedActions]= useState<{
      index: number
      id: string,
      name: string
  }[]>([])
  const [selectedModalIndex, setSelectedModalIndex] = useState<null | number>(null);
  const {availableActions,availableTriggers} = useAvailableActionsNTrigger()



  return (
    <div>
      <AppBar/>
      <div className="flex justify-end bg-slate-200 pr-5 pt-5">
        <DarkBtn onClick={async ()=>{
           if(!selectedTrigger?.id){
            return;
           }

           const response = await axios.post(`${BACKEND_URL}/zap`,{
            availableTriggerId: selectedTrigger.id,
            triggerMetadata: {},
            actions: selectedActions.map((selectedAction)=>({
                availableActionId:selectedAction.id,
                actionMetadata: {},
            }))},{
              headers: {
                Authorization: localStorage.getItem("token")
              }
            })

  
            const zapid =response.data.zapId;
            console.log(zapid)
            router.push("/dashboard")

        }}>Publish</DarkBtn>
      </div>
      <div className="w-full min-h-screen bg-slate-200 flex flex-col justify-center items-center gap-y-2" >
      <ZapCell name={selectedTrigger?.name ? selectedTrigger.name : "Trigger"} index={1} onClick={()=>{
        setSelectedModalIndex(1)
      }} />
       <div className="w-full "> 
        {selectedActions.map((action, idx)=>{
            return <div key={idx} className="w-full flex justify-center">
              <ZapCell name={action.name ? action.name : "Action"} index={action.index} onClick={()=>setSelectedModalIndex(action.index)}/>
            </div>   
        })}
       </div>
       <DarkBtn onClick={()=>{
        setSelectedActions(a => [...a, {
          index: 2 + a.length,
          id: "",
          name: ""
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
                                          id: props.id,
                                          name: props.name
                                        })
                                       }else{
                                        setSelectedActions((a)=>{
                                            const newActions = [...a]
                                            newActions[selectedModalIndex-2]={
                                              index: selectedModalIndex,
                                              id: props.id,
                                              name: props.name,
                                            }
                                            return newActions
                                        })
                                       }


                                       setSelectedModalIndex(null)

                                    }}  availableItems={selectedModalIndex == 1 ? availableTriggers : availableActions } />}
    </div>
  )
}




function Modal({index,onSelect, availableItems}:{index:number,onSelect:(props: null | {name:string,id:string})=>void, availableItems: AvailableItemType[] }){
  
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
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
              <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">{index == 1 ? "Select Trigger" : "Select Action"}</h3>
              <div className="mt-2">
              <div className='w-full'>
                      <div className=''>
                         {availableItems.map((avalableItem)=><Item onClick={()=>{
                          onSelect({
                            id:avalableItem.id,
                            name:avalableItem.name
                          })
                         }} key={avalableItem.id} Item={avalableItem}/>)}
                      </div>
              </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
         <button type="button" onClick={()=>{
            onSelect(null)
          }} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</div>
}

function Item({Item, onClick}:{Item: AvailableItemType, onClick:()=>void}){
  return <div className='w-1/2 flex gap-3 rounded hover:bg-slate-100 cursor-pointer py-1 px-3' onClick={onClick}>
           <img className='w-4 h-4 text-center mt-1' src={Item.image} alt="logo"/>
           <div className=''>
            {Item.name}
           </div>
  </div>
}