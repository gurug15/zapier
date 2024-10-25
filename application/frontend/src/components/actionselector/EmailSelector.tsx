import React, { useState } from 'react';
import Input from '../Input';
 // Assuming the Input component is in the same directory



export default function EmailSelector({setMetadata}: {setMetadata: (paramas: any)=>void}) {
  const [body, setBody] = useState('');
  const [toEmail, setToEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMetadata({
        toEmail: "",
        body: ""
    })
  };
  console.log(toEmail,body)
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Email Configuration</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="To"
          onChange={(e) => setToEmail(e.target.value)}
          value={toEmail}
          type="text"
          name="toEmail"
        />
        <Input
          label="Body"
          onChange={(e) => setBody(e.target.value)}
          value={body}
          type="text"
          name="body"
        />
        <div className="mt-6">
          <button
            type="submit"
            className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}