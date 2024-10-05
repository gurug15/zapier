'use client'
import AppBar from '@/components/AppBar'
import DarkBtn from '@/components/btns/DarkBtn'
import useZaps from '@/hooks/useZaps'
import { useRouter } from 'next/navigation'
import React from 'react'
import { HOOKS_URL } from '../config'

export default function Dashboard() {
  const router = useRouter()
  return (
    <div>
      <AppBar/>
      <div className='max-w-screen-lg m-auto border-r-2 border-l-2 p-5  h-full'>
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
           <div className=' flex-1 text-center'>Id</div>
           <div className=' flex-1 text-center'>Trigger</div>
           <div className=' flex-1 text-center'>Webhook URL</div>
           <div className='flex-1 text-center'>Actions</div>
        </div>
          {zaps.map((zap)=>{
            return <div key={zap.id} onClick={()=>{
              router.push("/zaps/"+zap.id)
            }} className='flex m-auto mt-2 border-2 p-4 w-full text-center hover:bg-slate-100 rounded-md cursor-pointer'>
              <div className='flex-1 border-r-2 text-center'>{zap.id}</div>
              <div className='flex-1 border-r-2 text-center'>{zap.trigger.type.name}</div>
              <div className='flex-1 border-r-2 text-center px-2'>{`${HOOKS_URL}/catch/1/${zap.id}`}</div>
              <div className='flex-1 flex justify-center'>
                <div className='p-1 border-2 rounded-md ml-1 w-7 h-7'><img src={zap.trigger.type.image} alt="T" /></div>
                {zap.actions.map((action)=>{
                return <div key={action.id} className='p-1 border-2 rounded-md ml-1 w-7 h-7 '>
                   <img src={action.type.image}  alt='A'/>
                </div>
              })}</div>
            </div>
          })}    
  </div>
}