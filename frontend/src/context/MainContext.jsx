import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";


export const MainContext = createContext();

const MainContextProvider = ({ children }) => {
    const url = import.meta.env.VITE_API_URL
    const token = sessionStorage.getItem("token");
    const [cartItems, setCartItems] = useState({});
    const [whishlistItems, setWhishlistItems] = useState({});
    const [loading, setLoading] = useState(true);
    const [allProducts, setAllProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [focusSearch, setFocusSearch] = useState(false);

    
    const addToCart = async (itemId) => {
        const newQuantity = cartItems[itemId] ? cartItems[itemId] + 1 : 1;
      
        setCartItems((prev) => ({
          ...prev,
          [itemId]: newQuantity,
        }));
      
        if (token) {
          await axios.post(
            url + "/cart/add",
            { itemId, quantity: newQuantity },
            {headers: { Authorization: `Bearer ${token}` },});
        }
      };

    const removeFromCart = async (itemId) => {
        const currentQuantity = cartItems[itemId];
        const newQuantity = currentQuantity - 1;
      
        const updatedCart = { ...cartItems };
      
        if (newQuantity > 0) {
          updatedCart[itemId] = newQuantity;
        } else {
          delete updatedCart[itemId];
        }
      
        setCartItems(updatedCart);
      
        if (token) {
          await axios.post(
            url + "/cart/remove",
            { itemId, quantity: newQuantity },
            {headers: { Authorization: `Bearer ${token}` },});
        }
      };

      const deleteItemFromCart = async (itemId) => {
        try {
          const updatedCart = { ...cartItems };
          delete updatedCart[itemId];
          setCartItems(updatedCart);
    
          const response = await axios.post(
            `${url}/cart/removeItem`,
            { itemId },
            {headers: { Authorization: `Bearer ${token}` }});
  
          if (response.data.success) {
            console.log('Item successfully deleted from cart');
          } else {
            console.error('Failed to delete item:', response.data.message);
            setCartItems(cartItems);
          }
        } catch (error) {
          console.error('Error deleting item from cart:', error);
          setCartItems(cartItems);
        }
      };

      const addToWhishlist = async (itemId) => {
        try {
          // Update local state optimistically
          const updatedWhishlist = { ...whishlistItems };
          updatedWhishlist[itemId] = true;
          setWhishlistItems(updatedWhishlist);
      
          if (token) {
            const response = await axios.post(
              `${url}/wishList/add`,
              { itemId },
              { headers: { Authorization: `Bearer ${token}` } }
            );
      
            if (response.data.success) {
              console.log('Item successfully added to wishlist');
            } else {
              console.error('Failed to add item to wishlist:', response.data.message);
              // Revert state if API call fails
              setWhishlistItems((prev) => {
                const newState = { ...prev };
                delete newState[itemId];
                return newState;
              });
            }
          }
        } catch (err) {
          console.error('Error adding item to wishlist:', err);
          // Revert state if an error occurs
          setWhishlistItems((prev) => {
            const newState = { ...prev };
            delete newState[itemId];
            return newState;
          });
        }
      };
      

      const removeFromWhishList = async (itemId) => {
        try {
          // Update local state optimistically
          const updatedWhishlist = { ...whishlistItems };
          delete updatedWhishlist[itemId];
          setWhishlistItems(updatedWhishlist);
      
          if (token) {
            const response = await axios.post(
              `${url}/wishList/remove`,
              { itemId },
              { headers: { Authorization: `Bearer ${token}` } }
            );
      
            if (response.data.success) {
              console.log('Item successfully removed from wishlist');
            } else {
              console.error('Failed to remove item from wishlist:', response.data.message);
              // Revert state if API call fails
              setWhishlistItems((prev) => ({
                ...prev,
                [itemId]: true, // Add item back if removal fails
              }));
            }
          }
        } catch (err) {
          console.error('Error removing item from wishlist:', err);
          // Revert state if an error occurs
          setWhishlistItems((prev) => ({
            ...prev,
            [itemId]: true, // Add item back if removal fails
          }));
        }
      };
      
      const emptyCart = async ()=>{
        try {
          setCartItems({});
          if (token) {
            const response = await axios.post(
              `${url}/cart/empty`,
              {},
              { headers: { Authorization: `Bearer ${token}` } }
            );
      
            if (response.data.success) {
              console.log('Cart successfully emptied');
            } else {
              console.error('Failed to empty cart:', response.data.message);
              // Revert state if API call fails
              setCartItems(cartItems);
            }
          }
        } catch (err) {
          console.error('Error emptying cart:', err);
          // Revert state if an error occurs
          setCartItems(cartItems);
        }
      }



//useEffect to fetch cart and whishlist data
      useEffect(() => {
        const fetchData = async () => {
            try {
                if (token) {
                    const [cartResponse, whishlistResponse] = await Promise.all([
                        axios.get(`${url}/cart`, { headers: { Authorization: `Bearer ${token}` } }),
                        axios.get(`${url}/wishList`, { headers: { Authorization: `Bearer ${token}` } }),
                    ]);

                    if (cartResponse.data.success) {
                        setCartItems(cartResponse.data.cart);
                    }

                    if (whishlistResponse.data.success) {
                        setWhishlistItems(whishlistResponse.data.wishListData || {});
                    }
                }
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };

        const fetchAllProducts = async()=>{
          try {
            const response = await axios.get(`${url}/groceries`);
            setAllProducts(response.data);
          } catch (err) {
            console.error('Error fetching products:', err);
          }
        }

        fetchData();
        fetchAllProducts();
      }, [token,url]);
      //useEffect ends here


  useEffect(() => {
    if (searchQuery.trim() === '') {
        
        setFilteredProducts([]);
    } else {
        const filtered = allProducts.filter(product => {
            const query = searchQuery.toLowerCase();
            return (
                product.name.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query)
            );
        });
        setFilteredProducts(filtered);
    }
  }, [searchQuery, allProducts]);

    const contextValue = {
        url,
        token,
        addToCart,
        removeFromCart,
        deleteItemFromCart,
        cartItems,
        whishlistItems,
        addToWhishlist,
        removeFromWhishList,
        loading,
        setLoading,
        emptyCart,
        allProducts,
        setSearchQuery,
        filteredProducts,
        setFocusSearch,
        focusSearch,
    };

   

    return (
        <MainContext.Provider value={contextValue}>
            {children}
        </MainContext.Provider>
    );
};
MainContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MainContextProvider;
