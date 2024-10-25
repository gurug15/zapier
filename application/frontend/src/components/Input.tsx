

interface InputTypes {
    label: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>)=>void,
    value: string,
    type: string,
    name: string
}


export default function Input({label,onChange,value,type,name}:InputTypes) {
  return (
    <div className="mb-4">
        <label htmlFor="email" className="block text-left text-sm font-medium text-gray-700">
         {label}
        </label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange} // Correct event type: ChangeEvent<HTMLInputElement>
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
        />
      </div>
  )
}
