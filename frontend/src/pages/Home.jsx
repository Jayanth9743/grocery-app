import { useContext } from "react"
import Ads from "../components/Ads.jsx"
import Catagories from "../components/Catagories.jsx"
import FeaturedProducts from "../components/FeaturedProducts.jsx"
import { MainContext } from "../context/MainContext.jsx"
import Loading from "./Loading.jsx"
import Footer from "../components/Footer.jsx"
import BeforeFooter from "../components/BeforeFooter.jsx"


const Home = () => {
  const {loading} = useContext(MainContext);

if(loading){
  return <Loading/>
}

  return (
    <>
          <Ads/>
        <Catagories/>
        <FeaturedProducts/>
        <BeforeFooter/>
        <Footer/>
    </>
  )
}

export default Home
