import { HiMiniShoppingCart } from "react-icons/hi2";
import { MdFavorite } from "react-icons/md";
import profile from "../assets/profile.jpg";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../context/MainContext.jsx";
import axios from "axios";

const Navbar = () => {
  const { url, token,setLoading, loading, cartItems, whishlistItems,setSearchQuery, searchQuery } = useContext(MainContext);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${url}/users/user`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData(response.data.user);
      } catch (err) {
        console.log(err);
      }finally{
        setLoading(false)
      }
    };
    fetchUser();
  }, [token, url, setLoading]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (!userData) return null;
  if(loading){
    return <></>;
  }
  


  const totalCartItems = Object.keys(cartItems).length;
  const totalWhishlistItems = Object.keys(whishlistItems).length;

  return (
    <div className="fixed top-0 z-10 flex flex-col items-start justify-center w-full h-32 bg-green-900 md:flex-row md:h-16 md:items-center">
      <div className="flex items-center justify-start gap-2 text-xl text-white h-2/5 md:h-auto md:w-1/3">
        <img src={profile} alt="Profile" className="object-contain w-8 h-8 ml-4 rounded-full" />
        <p>Welcome, {userData.name}!</p>
      </div>

      <div className="flex items-center justify-center w-full gap-2 h-3/5 md:h-auto md:w-2/3">
        <div className="flex items-center justify-center w-9/12 h-auto md:w-4/5 lg:w-3/5">
          <input type="text" placeholder="search fresh vegies" className="w-full p-2 rounded-md outline-none"
          value={searchQuery}
          onChange={handleInputChange}
          onClick={()=>navigate('/search')}/>
        </div>
        <div className="flex items-center justify-center md:w-1/12 lg:w-1/6 md:gap-2">
          <div className="relative flex items-center justify-center h-full ">
            <MdFavorite className="text-2xl text-white cursor-pointer" onClick={()=>navigate('/wishList')} />
                <span className={`absolute text-sm text-white w-5 h-5 bg-red-500 rounded-full text-center top-[-8px] right-[-8px] ${totalWhishlistItems == 0 ? 'hidden' : 'block'}`}>{totalWhishlistItems}</span>
            </div>
          <p className="hidden text-xl text-white lg:block"onClick={()=>navigate('/wishList')}>wishlist</p>
        </div>
        <div className="flex items-center justify-center md:w-1/12 lg:w-1/6 md:gap-2">
          <div className="relative flex items-center justify-center h-full ">
            <HiMiniShoppingCart className="text-2xl text-white cursor-pointer" onClick={() => navigate('/cart')} />
              <span className={`absolute text-sm text-white w-5 h-5 bg-red-500 rounded-full text-center top-[-8px] right-[-8px] ${totalCartItems == 0 ? 'hidden' : 'block'}`}>{totalCartItems}</span>
          </div>
          <p className="hidden text-xl text-white lg:block"onClick={() => navigate('/cart')}>cart</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;