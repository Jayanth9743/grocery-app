import { FaSpinner } from "react-icons/fa6";

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <FaSpinner className="text-5xl animate-spin" />
    </div>
  )
}

export default Loading
