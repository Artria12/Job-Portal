import React, { useState } from 'react'
import Navbar from '../components/shared/navbar.jsx'
import { Label } from '../components/ui/label.jsx'
import { Input } from '../components/ui/input.jsx'
import { toast } from 'sonner'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_ENDPOINT } from '../utils/constant.js'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '../redux/authslice.js'
import store from '../redux/store.js'
import { Loader2 } from 'lucide-react'
 const Login=()=>{
       const [input,setinput]=useState({
            email:"",
            password:"",
            role:"",
        })
        const {loading}=useSelector(store=>store.auth)
        const dispatch=useDispatch();
        const navigate=useNavigate();
        const changeEventhandler=(e)=>{
              setinput({...input,[e.target.name]:e.target.value})
        }
      
        const submitHandler=async (e)=>{   //api call ho raha hai is liye async
           e.preventDefault(); 
         try {
            console.log("enter");
            dispatch(setLoading(true));
            const res=await axios.post(`${USER_API_ENDPOINT}/login`,input,{
                  headers:{
                     "Content-Type":"application/json"
                  },
                  withCredentials:true
            })
            console.log(res);
            if(res?.data?.success){
               dispatch(setUser(res.data.user))
               navigate("/")
               toast.success(res?.data?.message)
              
            }
        } catch (error) {
           console.log("entering error")
         console.log(error?.response?.data?.message);
              toast.error(error?.response?.data?.message)
            
        }finally{
            dispatch(setLoading(false));
        }
        }
  return (
    <div>
        <Navbar/>
        <div className='flex items-center justify-center max-w-7xl mx-auto'>
            <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                 <h1 className='font-bold text-xl mb-5'>Log In</h1>
            
                 <div className='my-2'>
                    <Label>Email</Label>
                    <Input type="email" 
                       name="email"
                      value={input.email}
                       onChange={changeEventhandler}
                      placeholder="patel@gmail.com"/>
                 </div>
            
                 <div className='my-2'>
                    <Label>Password</Label>
                    <Input type="password"
                    name="password"
                    value={input.password}
                     onChange={changeEventhandler}
                      placeholder="........"/>
                 </div>
                   <div className='flex items-center justify-between'>
                   <RadioGroup  className='flex items-center gap-4 my-5'>
                   <div className="flex items-center space-x-2">
                     <Input type="radio" name="role" value="student" className='cursor-pointer' checked={input.role==="student"} onChange={changeEventhandler}/>
                    <Label htmlFor="r1">Student</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                    <Input type="radio" name="role" value="recruiter" checked={input.role==="recruiter"} onChange={changeEventhandler} className='cursor-pointer'/>
                     <Label htmlFor="r2">Recruiter</Label>
                    </div>
                      </RadioGroup>
         
                   </div>
                   <div>
                         {
                           loading? <Button className='w-full my-4'><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please Wait</Button>:(
                              <Button type="submit" className='w-full my-4'>LogIn</Button>
                           )
                         }
                      
                      <span className='text-sm'>Don't have an account?<Link to="/signup" className='text-blue-600'>SignUp</Link></span>
                   </div>
            </form>
        </div>
    </div>
  )
}
export default Login
