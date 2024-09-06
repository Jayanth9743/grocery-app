import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { MainContext } from '../context/MainContext';
import { FaHeart } from "react-icons/fa6";

const FeaturedProducts = () => {
  const {url,addToCart, removeFromCart, cartItems,  addToWhishlist, removeFromWhishList, whishlistItems} = useContext(MainContext);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(url+"/groceries")
      .then((response) => setData(groupByCategory(response.data)))
      .catch((err) => console.log(err));
  }, [url, ]);

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
      if (whishlistItems[itemId]) {
        await removeFromWhishList(itemId);
      } else {
        await addToWhishlist(itemId);
      }
    } catch (err) {
      console.log(err);
    }
  };


  const groupByCategory = (products) => {
    return products.reduce((grouped, product) => {
      if (!grouped[product.category]) {
        grouped[product.category] = [];
      }
      if (grouped[product.category].length < 5) { 
        grouped[product.category].push(product);
      }
      return grouped;
    }, {});
  };


  const handleViewAll = (category) => {
    navigate(`/products/${category}`);

  };

  return (
    <>
      {Object.entries(data).map(([category, products]) => (
        <div key={category} className="flex flex-col w-full gap-6 overflow-hidden">
            <div className='flex items-center justify-start w-full lg:justify-between'>
              <p className="mt-12 ml-6 text-2xl font-medium lg:ml-14">{category}</p>
              <button className='hidden w-20 h-10 mt-12 mr-4 text-white bg-green-900 rounded lg:mr-14 lg:block ' onClick={()=>handleViewAll(category)}>view all</button>
            </div>
          <div className="flex items-center justify-around w-full overflow-x-auto hide-scrollbar">
            {products.map((info) => (
              <div
                key={info._id}
                className="relative flex flex-col items-center justify-around flex-shrink-0 w-48 gap-2 m-4 border border-green-900 border-solid rounded-lg shadow-lg h-72"
              >
                <FaHeart className={`absolute text-2xl text-gray-200 cursor-pointer top-1 right-3 ${whishlistItems[info._id] ? 'text-red-500' : 'text-gray-200'}`}
                onClick={() => handleWhishList(info._id)}
                />
                <img
                  src={`${url}/images/${info.image}`}
                  alt={info.name}
                  className="object-contain w-3/5 h-32 mt-2"
                />
                <p className="font-bold">{info.name}</p>
                <div className="flex items-center justify-around w-full">
                    <p className="font-semibold">₹{info.price}rs</p>
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
            <div className='flex flex-col items-center justify-center flex-shrink-0 h-64 gap-4 w-36 lg:hidden'>
              <p className='text-xl'>view all</p>
              <IoIosArrowDroprightCircle className='text-4xl text-green-900 cursor-pointer' onClick={()=>handleViewAll(category)}/>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default FeaturedProducts;
