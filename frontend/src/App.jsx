import React from 'react'
import { Button } from "@/components/ui/button"
import Navbar from './components/shared/navbar';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Auth/Login.jsx';
import Signup from './Auth/Signup.jsx';
import Home from './components/home.jsx';
import { Jobs } from './components/Jobs.jsx';
import { Browse } from './components/Browse.jsx';
import { Profile } from './components/Profile.jsx';
import JobDescription from './components/JobDescription.jsx'
import Companies from './components/admin/Companies.jsx';
import CompanyCreate from './components/admin/CompanyCreate.jsx';
import CompanySetup from './components/admin/CompanySetup.jsx';
import AdminJobs from './components/admin/Adminjobs.jsx';
import PostJob from './components/admin/PostJob.jsx';
import Applicants from './components/admin/Applicants.jsx';
const appRouter=createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },{
    path:'/signup',
    element:<Signup/>
  },
   {
    path:'/jobs',
    element:<Jobs/>
   },
   {
    path:'/browse',
    element:<Browse/>
   },
   {
    path:'/profile',
    element:<Profile/>
   },{
    path:'/description/:id',
    element:<JobDescription/>
   },
   {
    path:'/admin/companies',
    element:<Companies/>
   },
   {
    path:'/admin/companies/create',
    element:<CompanyCreate/>
   },{
    path:'/admin/companies/:id',
    element:<CompanySetup/>
   },
   {
    path:'/admin/jobs',
    element:<AdminJobs/>
   },
   {
    path:'/admin/jobs/create',
    element:<PostJob/>
   },
   {
    path:'/admin/jobs/:id/applicants',
    element:<Applicants/>
   }

])
 const App = () => {
  return (
    <div>
        <RouterProvider router={appRouter}/>

      
      </div>
    )
}
export default App;
 
