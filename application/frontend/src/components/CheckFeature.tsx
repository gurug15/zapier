import { FaCheckCircle } from "react-icons/fa"
export default function CheckFeature({text}:{text:string}) {
  return (
    <div className="flex justify-start gap-2">
      <FaCheckCircle className="text-green-600 mt-1"/>
      <p className="pb-2 text-lg">{text}</p>
    </div>
  )
}
