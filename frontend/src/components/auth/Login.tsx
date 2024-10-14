"use client"
import React, { useState } from 'react';
import Input from '../Input';
import { BACKEND_URL } from '@/app/config';
import axios from "axios"
import { useRouter } from 'next/navigation';





const LoginCard: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const  router  = useRouter();
  console.log(BACKEND_URL)
  // This is for handling input changes (onChange event)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // This is for handling form submission (onSubmit event)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md p-6 border border-gray-200 rounded-lg bg-white">
        <Input  type='email' value={formData.email} onChange={handleChange} name='email' label='Work Email' />
        <Input type='password' value={formData.password} onChange={handleChange} name='password' label='Password'/>
      <button
        type="submit"
        onClick={async () => {
          const res = await axios.post(`${BACKEND_URL}/user/signin`,{
            username: formData.email,
            password: formData.password
          })
           try {
            if(res.data){
              localStorage.setItem("token",res.data.token)
              router.push("/dashboard")
            }
           } catch (error) {
            console.log("error is: ",error)
           }
           
        }}
        className="w-full bg-orange-500 text-white py-2 px-4 rounded-full font-bold hover:drop-shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
      >
        Login
      </button>
      <p className="mt-4 text-sm text-center text-gray-500">
        By signing up, you agree to Zapier&apos;s <a href="#" className="text-orange-500 underline">terms of service</a> and <a href="#" className="text-orange-500 underline">privacy policy</a>.
      </p>
    </form>
  );
};

export default LoginCard;
