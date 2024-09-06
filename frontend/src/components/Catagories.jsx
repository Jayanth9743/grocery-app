import cv from "../assets/cv.png"
import cf from "../assets/cf.png"
import cj from "../assets/cj.png"
import cs from "../assets/cs.png"
import cg from "../assets/cg.png"
import { useNavigate } from "react-router-dom"

const Catagories = () => {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center w-full gap-5 overflow-hidden">
        <div className="flex items-center justify-start w-full mt-12 ml-8 text-2xl font-medium md:text-3xl mdx:ml-24 lg:ml-32 ">
            Explore Categories
        </div>
      <div className="flex items-center justify-between w-full gap-6 pr-4 overflow-x-auto hide-scrollbar mdx:w-11/12">
            <div className="flex flex-col items-center justify-around flex-shrink-0 ml-4 rounded-lg cursor-pointer w-36 h-44 bg-c1"
            onClick={()=>navigate(`/products/cooking_essentials`)}>
                <img src={cg} alt="" className="object-cover w-4/5" />
                <p className="w-3/5 text-center">cooking essentials</p>
            </div>
            <div className="flex flex-col items-center justify-around flex-shrink-0 rounded-lg cursor-pointer w-36 h-44 bg-c2"
            onClick={()=>navigate(`/products/Vegetable`)}>
                <img src={cv} alt="" className="object-cover w-4/5" />
                <p>vegetables</p>
            </div>
            <div className="flex flex-col items-center justify-around flex-shrink-0 rounded-lg cursor-pointer w-36 h-44 bg-c3"
            onClick={()=>navigate(`/products/fruits`)}>
                <img src={cf} alt="" className="object-cover w-4/5" />
                <p>fruits</p>
            </div>
            <div className="flex flex-col items-center justify-around flex-shrink-0 rounded-lg cursor-pointer w-36 h-44 bg-c4"
            onClick={()=>navigate(`/products/snacks`)}>
                <img src={cs} alt="" className="object-cover w-2/4" />
                <p>snacks</p>
            </div>
            <div className="flex flex-col items-center justify-around flex-shrink-0 rounded-lg cursor-pointer w-36 h-44 bg-c5"
            onClick={()=>navigate(`/products/juices`)}>
                <img src={cj} alt="" className="object-cover w-5/6" />
                <p>drinks</p>
            </div>
      </div>
    </div>
  )
}

export default Catagories
