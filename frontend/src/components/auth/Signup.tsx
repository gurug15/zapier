"use client"
import React, { useState } from 'react';
import Input from '../Input';
import axios from 'axios';
import { BACKEND_URL } from '@/app/config';
import { useRouter } from 'next/navigation';




const SignUpCard: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: ''
  });
  const router = useRouter();

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
         <Input type='text' value={formData.name} onChange={handleChange} name='name' label='Name'/>
         <Input type='password' value={formData.password} onChange={handleChange} name='password' label='Password'/>

      <button
        type="submit"
        onClick={async ()=>{
             const res = await axios.post(`${BACKEND_URL}/user/signup`,{
              username: formData.email ,
              name: formData.name , 
              password: formData.password,
             })
            return res?.data && router.push("/login") 
             
        }}
        className="w-full bg-orange-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
      >
        Get started free
      </button>

      <p className="mt-4 text-sm text-center text-gray-500">
        By signing up, you agree to Zapier&apos;s <a href="#" className="text-orange-500 underline">terms of service</a> and <a href="#" className="text-orange-500 underline">privacy policy</a>.
      </p>
    </form>
  );
};

export default SignUpCard;
