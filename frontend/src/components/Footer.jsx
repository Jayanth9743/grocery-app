import { TiSocialFacebook } from "react-icons/ti";
import { FaInstagram } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoMdMailOpen } from "react-icons/io";
import { AiFillHome } from "react-icons/ai";
import { IoMdCall } from "react-icons/io";

const Footer = () => {
  return (
    <div className='flex flex-col w-full'>

      <div className="flex flex-col items-center justify-center w-full h-20 gap-2 bg-green-900 md:flex-row md:h-12">
        <div className="flex justify-center items-center text-white w-full md:w-[60%] md:justify-start lg:w-[70%]">
            <p className="md:ml-8">get connected us on social neyworks:</p>
        </div>
        <div className="flex justify-center gap-12 items-center text-white w-full md:w-[40%] lg:w-[30%]">
          <TiSocialFacebook className="text-2xl cursor-pointer"/>
          <FaInstagram className="text-xl cursor-pointer"/>
          <FaGoogle className="text-xl cursor-pointer"/>
          <FaXTwitter className="text-xl cursor-pointer"/>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-full gap-8 bg-green-100 md:flex-row md:h-[15rem]">

        <div className="flex flex-col items-center justify-center w-full gap-3 text-center">
          <p className="mt-4 text-xl font-semibold md:mt-0">products</p>
          <p>Vegetables</p>
          <p>cooking essentials</p>
          <p>fresh fruits</p>
          <p>tasty snacks</p>
          <p>jucies</p>
        </div>

        <hr className="w-[50%] text-black border border-solid border-black md:hidden"/>

        <div className="flex flex-col items-center justify-center w-full gap-3 text-center">
          <p className="text-xl font-semibold ">others</p>
          <p>Terms & conditions</p>
          <p>Private policy</p>
          <p>help center</p>
        </div>

        <hr className="w-[50%] text-black border border-solid border-black md:hidden"/>

        <div className="flex flex-col items-center justify-center w-full gap-4 mb-4 text-center md:mb-0">
          <p className="text-xl font-semibold">contact us</p>
          <div className="flex items-center justify-center w-full gap-1">
            <AiFillHome className="text-xl"/>
            <p>Bengaluru, Karnataka-560054</p>
          </div>
          <div className="flex items-center justify-center w-full gap-1">
            <IoMdMailOpen className="text-xl"/>
            <p>example@gmail.com</p>
          </div>
          <div className="flex items-center justify-center w-full gap-1">
            <IoMdCall className="text-xl"/>
            <p>+91 1234567890</p>
          </div>
        </div>
        
      </div>

      <div className="flex items-center justify-center w-full h-8 bg-green-100">
        <p className="pt-1 text-sm text-center">2024 © Developed By Jayanth P</p>
      </div>

    </div>
  )
}

export default Footer
