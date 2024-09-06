import { useContext} from "react";
import { MainContext } from "../context/MainContext.jsx";
import { RiDeleteBinLine } from "react-icons/ri";
import Loading from "./Loading.jsx";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const WhistList = () => {
  const { url, whishlistItems, cartItems, addToCart,loading, removeFromCart,removeFromWhishList, allProducts } = useContext(MainContext);
  const navigate = useNavigate();
 

  const handleAddToCart = async (itemId) => {
    try {
      await addToCart(itemId);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveFromCart = async (itemId) => {
    try {
      await removeFromCart(itemId);
    } catch (err) {
      console.log(err);
    }
  };

  const handleWhishList = async (itemId) => {
    try {
       await removeFromWhishList(itemId);
    } catch (err) {
      console.log(err);
    }
  };

  const whishlistProductIds = Object.keys(whishlistItems || {});
  const whishlistProducts = allProducts.filter(product => whishlistProductIds.includes(product._id));

  if(loading){
    return <Loading/>
  }

 if(whishlistProducts.length === 0){
  return(
    <div className="container px-4 mx-auto mb-2 mt-36 md:mt-20">
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-2xl font-bold">No items in your whishlist</p>
        <button className="px-6 py-2 text-white bg-green-900 rounded-md" onClick={()=>navigate('/')}>home</button>
      </div>
    </div>
  )
 }

  return (
    <div className="container px-4 mx-auto mb-2 mt-36 md:mt-20">
      <div className="flex items-center justify-start w-full h-12 gap-1 lg:hidden" >
        <MdOutlineKeyboardArrowLeft className="text-3xl cursor-pointer" onClick={()=>navigate('/')}/>
        <p className="text-xl font-semibold cursor-pointer"onClick={()=>navigate('/')}>home</p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {whishlistProducts.map(info => (
          <div
            key={info._id}
            className="relative flex flex-col items-center justify-around p-4 border border-green-900 rounded-lg shadow-lg lg:h-72">
                <RiDeleteBinLine className="absolute text-2xl text-red-500 top-3 right-3" onClick={() => handleWhishList(info._id)} />
            <img
              src={`${url}/images/${info.image}`}
              alt={info.name}
              className="object-contain w-3/5 h-32"
            />
            <p className="font-bold text-center">{info.name}</p>
            <div className="flex items-center justify-center w-full mt-4">
              {cartItems[info._id] ? (
                <div className="flex justify-center items-center gap-2 w-[5.5rem] h-[2.5rem] rounded-lg border-2 border-solid border-green-900">
                  <p
                    className="text-xl font-bold cursor-pointer"
                    onClick={() => handleRemoveFromCart(info._id)}
                  >
                    -
                  </p>
                  <p>{cartItems[info._id]}</p>
                  <p
                    className="text-xl font-bold cursor-pointer"
                    onClick={() => handleAddToCart(info._id)}
                  >
                    +
                  </p>
                </div>
              ) : (
                <button
                  className="px-4 py-2 font-medium text-green-900 border-2 border-green-900 rounded-lg bg-green-50"
                  onClick={() => handleAddToCart(info._id)}
                >
                  ADD
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhistList;
