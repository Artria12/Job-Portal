import React, { useEffect } from 'react'
import Navbar from './shared/navbar.jsx'
import HeroSection from './HeroSection.jsx'
import CategoryCarousel from './CategoryCarousel.jsx'
import LatestJobs from './LatestJobs.jsx'
import Footer from './footer.jsx'
import useGetAllJobs from '../hooks/usegetAlljobs.jsx'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import store from '../redux/store.js'

const Home=()=>{
      
     useGetAllJobs()
     const { user } = useSelector(store => store.auth);
     const navigate = useNavigate();
     useEffect(() => {
       if (user?.role === "recruiter") {
         navigate("/admin/companies");
       }
     }, []);
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <CategoryCarousel/>
      <LatestJobs/>
       <Footer/>
    </div>  
  )
}
export default Home
