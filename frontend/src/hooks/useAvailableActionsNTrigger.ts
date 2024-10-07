import { BACKEND_URL } from "@/app/config"
import axios from "axios"
import { useEffect, useState } from "react"



export interface AvailableItemType {
    id: string,
    name: string,
    image: string,
}


export const useAvailableActionsNTrigger = ()=>{
   const [availableActions, setAvailableActions] = useState<AvailableItemType[]>([])
   const [availableTriggers, setAvaiilableTrigger] = useState<AvailableItemType[]>([])
   const [loading, setLoading] = useState<boolean>(true)

   useEffect(()=>{
    const fetchData = async () => {
        try {
        const trigger = await axios.get(`${BACKEND_URL}/trigger/available`)
        const action = await axios.get(`${BACKEND_URL}/action/available`)
        if(!(action.data.availableActions || trigger.data.availableTriggers)){
            throw new Error("NO Actions/Triggers")
        }
        setAvaiilableTrigger(trigger.data.availableTriggers)
        setAvailableActions(action.data.availableActions)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
      fetchData()
   },[])

   return { availableActions, availableTriggers, loading}

}