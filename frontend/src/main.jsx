import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Products from './pages/Products.jsx';
import WhishList from './pages/WhishList.jsx';
import Cart from './pages/Cart.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import MainContextProvider from './context/MainContext.jsx';
import SearchPage from './pages/SearchPage.jsx';

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([{
  path: '/',
  element: (
    <ProtectedRoute>
      <Layout />
    </ProtectedRoute>
  ),
  children: [
    {
      path: '/',
      element: <App />
    },
    {
      path: '/products/:category',
      element: <Products />
    },
    {
      path: '/whishlist',
      element: <WhishList />
    },
    {
      path: '/cart',
      element: <Cart />
    },
    {
      path: '/wishList',
      element: <WhishList />
    },
    {
      path: '/search',
      element: <SearchPage />
    },
  ]
},
{
  path: '/login',
  element: <LoginPage />
}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <MainContextProvider>
        <RouterProvider router={router} />
      </MainContextProvider>
  </React.StrictMode>,
);