

export default function ZapCell({name, index}:{name?:string, index:number}) {
  return (
    <div className="flex justify-center gap-2 items-center border border-black rounded w-1/6 px-5 py-3 text-xl cursor-pointer hover:bg-slate-100 mt-2">
      <div className="font-bold">
       {index}.
      </div>
      <div>
        {name}
      </div>
    </div>
  )
}
