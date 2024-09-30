'use client'
import AppBar from '@/components/AppBar'
import DarkBtn from '@/components/btns/DarkBtn'
import useZaps from '@/hooks/useZaps'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Dashboard() {
  const router = useRouter()
  return (
    <div>
      <AppBar/>
      <div className='max-w-screen-lg m-auto border-r-2 border-l-2 p-5  h-[calc(100vh-64px)]'>
        <div>
        <div className='flex justify-between  mt-10'>
          <div className='text-4xl font-bold'>
             My Zaps
          </div>
          <DarkBtn onClick={()=>{
            router.push("/zap/create")
          }}>Create</DarkBtn>
        </div>      
        </div>
           <ZapTabel/>
      </div>
      
    </div>
  )
}



function ZapTabel(){
  const { zaps ,loading } = useZaps();
  const router = useRouter()
  return loading ? "loading...": <div className='flex flex-col'>
        <div className='flex justify-between m-auto mt-10 border-2 p-4 w-full rounded-md'>
           <div>Name</div>
           <div>Trigger</div>
           <div>Actions</div>
        </div>
          {zaps.map((zap)=>{
            return <div key={zap.id} onClick={()=>{
              router.push("/zaps/"+zap.id)
            }} className='flex m-auto mt-2 border-2 p-4 w-full text-center hover:bg-slate-100 rounded-md cursor-pointer'>
              <div className='flex-1'>{zap.id}</div>
              <div className='flex-1'>{zap.trigger.type.name}</div>
              <div className='flex-1 flex justify-end'>{zap.actions.map((action)=>{
                return <div key={action.id} className='p-1 border-2 rounded-md ml-1'>
                   {action.type.name}
                </div>
              })}</div>
            </div>
          })}    
  </div>
}