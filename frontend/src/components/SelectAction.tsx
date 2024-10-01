import { AvailableActionsType } from '@/hooks/useAvailableActionsNTrigger'
import React from 'react'

export default function SelectAction({availableActions}:{availableActions:AvailableActionsType[]}) {
  return (
    <div className='w-full bg-orange-200 border'>
    <div className='w-full flex flex-col justify-around'>
      {availableActions.map((availableAction)=><div key={availableAction.id}>{availableAction.name}</div>)}
    </div>
</div>
)
 
}


function Action({Action}:{Action: AvailableActionsType}){
    return <div className=''>

    </div>
}