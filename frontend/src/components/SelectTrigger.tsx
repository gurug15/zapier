import { AvailableTriggerType } from '@/hooks/useAvailableActionsNTrigger'
import React from 'react'

export default function SelectTrigger({avalableTriggers}:{avalableTriggers:AvailableTriggerType[]}) {
  return (
    <div className='w-full bg-orange-200 border'>
        <div className=''>
          {avalableTriggers.map((avalableTrigger)=>avalableTrigger.name)}
        </div>
    </div>
  )
}
