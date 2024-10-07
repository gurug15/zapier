import React, { useState, ChangeEvent, FormEvent } from 'react';
import Input from '../Input';





export default function SolanaSelector({setMetadata}: {setMetadata: (paramas: any)=>void}) {
    const [to, setTo] = useState<string>('');
    const [amount, setAmount] = useState<string>('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMetadata({ to, amount });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Solana Transaction</h2>
            <form onSubmit={handleSubmit}>
                <Input
                    label="To"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTo(e.target.value)}
                    value={to}
                    type="text"
                    name="to"
                />
                <Input
                    label="Amount"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
                    value={amount}
                    type="text"
                    name="amount"
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