import { useContext, } from "react";
import { MainContext } from "../context/MainContext.jsx";
import { RiDeleteBinLine } from "react-icons/ri";
import Loading from "./Loading.jsx";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { url, cartItems, deleteItemFromCart, loading,allProducts, emptyCart } = useContext(MainContext);
  const navigate = useNavigate();
 

  const handleRemoveItem = async (itemId) => {
    try {
      await deleteItemFromCart(itemId);
    } catch (err) {
      console.error('Error removing item:', err);

    }
  };

  const handleOrder = async ()=>{
    try {
      await emptyCart();
      alert('Order placed successfully');
    } catch (err) {
      console.error('Error emptying cart:', err);
  }
};

  if(loading){
    return <Loading/>
  }

  const cartProductIds = Object.keys(cartItems);
  const cartProducts = allProducts.filter(product => cartProductIds.includes(product._id));

  const totalAmount = cartProducts.reduce((total, item) => {
    return total + item.price * cartItems[item._id];
  }, 0);

  if(cartProducts.length === 0){
    return(
      <div className="container px-4 mx-auto mb-2 mt-36 md:mt-20">
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-2xl font-bold">No items in your cart</p>
          <button className="px-6 py-2 text-white bg-green-900 rounded-md" onClick={()=>navigate('/')}>home</button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center w-full gap-6 pb-16 mt-36 md:mt-24">
      <div className="flex items-center justify-start w-full h-12 gap-1 lg:hidden" >
        <MdOutlineKeyboardArrowLeft className="text-3xl cursor-pointer" onClick={()=>navigate('/')}/>
        <p className="text-xl font-semibold cursor-pointer"onClick={()=>navigate('/')}>home</p>
      </div>
      {cartProducts.map(item => (
        <div className="flex items-center justify-around w-11/12 border-2 border-green-900 border-solid rounded-lg shadow lg:w-3/5 h-44" key={item._id}>
            <div className="flex items-center justify-around w-full h-full gap-3">
                  <div className="w-20 h-full ml-2">
                    <img src={`${url}/images/${item.image}`} alt={item.name} className="object-contain w-full h-full" />
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2 ">
                    <div>quantity</div>
                    <div className="mr-3 ">{cartItems[item._id]}</div> 
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1">
                    <div>₹{item.price * cartItems[item._id]}</div>
                  </div>
                  <div className="w-[2.5rem] mr-2 h-[2.5rem] border-red-500 rounded border border-solid flex justify-center items-center ">
                      <RiDeleteBinLine className="text-xl text-red-500 cursor-pointer " onClick={() => handleRemoveItem(item._id)} />
                  </div>
            </div>
        </div>
      ))}
      <div className="flex flex-col items-end justify-center w-11/12 gap-4 lg:w-3/5">
        <hr className="w-full border-black" />
        <div className="mr-3 text-lg font-medium">Total amount: ₹{totalAmount}</div>
        <button className="p-2 mr-3 text-white bg-green-900 rounded-md" onClick={handleOrder}>Proceed</button>
      </div>
    </div>
  );
};

export default Cart;
