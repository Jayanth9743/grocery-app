import { useNavigate } from "react-router-dom"
import wooden from "../assets/wooden.png"

const Ads = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center w-full mt-40 md:mt-28 h-60 md:h-72 lg:h-96 xl:h-100 ">

        <div className="flex flex-col items-end justify-center w-11/12 h-full gap-5 text-white bg-green-900 bg-cover rounded-xl lg:gap-10" style={{backgroundImage:`url(${wooden})`}}>
            <p className="mr-4 text-xl font-bold md:text-3xl lg:text-5xl lg:mr-8">Fresh and Healthy Veggies</p>
            <p className="mr-4 text-lg font-medium md:text-2xl lg:text-4xl lg:mr-8">Organic Market</p>
            <button className="w-24 h-10 p-1 mr-4 text-center text-white border border-white border-solid rounded-lg hover:scale-110 lg:mr-8" onClick={()=>navigate('/products/Vegetable')}>shop now</button>
        </div>

    </div>
  )
}

export default Ads
