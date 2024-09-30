import AppBar from '@/components/AppBar'
import LoginCard from '@/components/auth/Login'
import CheckFeature from '@/components/CheckFeature'
import React from 'react'

export default function page() {
  return (
    <div>
        <AppBar/>
          <div className='w-screen flex gap-x-5'>
          <div className='flex-1 flex justify-center items-center ml-11 '>
          <div className='flex flex-col justify-between w-7/12 h-[250px] '>
          <h2 className='text-4xl font-semibold  text-start'>
          Join millions worldwide who automate their work using Zapier.
          </h2>
          <ul>
          <CheckFeature text='Easy setup, no coding required'/>
          <CheckFeature text='Free forever for core features'/>
          <CheckFeature text='14-day trial of premium features & apps'/>
          </ul>
          </div>
          </div>
          <div className='w-[1px] h-[calc(100vh-64px)] bg-gray-200'/>
          <div className='flex-1 flex items-center ml-10 '>
               <LoginCard/>
          </div>
          </div>

    </div>
  )
}
