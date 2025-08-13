import React, { useState } from 'react'
import Navbar from '../components/shared/navbar.jsx'
import { Label } from '../components/ui/label.jsx'
import { Input } from '../components/ui/input.jsx'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_ENDPOINT } from '../utils/constant.js'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import store from '../redux/store.js'
import { setLoading } from '../redux/authslice.js'
import { Loader2 } from 'lucide-react'
const Signup = () => {
  const [input, setinput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""
  })
  const dispatch=useDispatch();
  const {loading}=useSelector(store=>store.auth);
  const navigate = useNavigate();
  const changeEventhandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value })
  }
  const changeFile = (e) => {
    setinput({ ...input, file: e.target.files?.[0] })
  }
  const submitHandler = async (e) => {   //api call ho raha hai is liye async
    e.preventDefault()
    try {
        
      const formData = new FormData();
      formData.append("fullname", input.fullname);
      formData.append("email", input.email);
      formData.append("phoneNumber", input.phoneNumber);
      formData.append("password", input.password);
      formData.append("role", input.role);
      if (input.file) {
        formData.append("file", input.file);
      }
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data"
        }

      })
      if (res.data.success) {
        toast.success(res?.data?.message)
        navigate("/login")
      }
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error);
    }
    finally{
          dispatch(setLoading(false));
    }
  }
  return (
    <div>

      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
          <div className='my-2'>
            <Label>Full Name</Label>
            <Input type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventhandler}
              placeholder="patel" />
          </div>
          <div className='my-2'>
            <Label>Email</Label>
            <Input type="email"
              value={input.email}
              name="email"
              onChange={changeEventhandler}
              placeholder="patel@gmail.com" />
          </div>
          <div className='my-2'>
            <Label>Phone Number </Label>
            <Input type="tel"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventhandler}
              placeholder="9876XXXXXX" />
          </div>
          <div className='my-2'>
            <Label>Password</Label>
            <Input type="password"
              value={input.password}
              name="password"
              onChange={changeEventhandler}
              placeholder="........" />
          </div>
          <div className='flex items-center justify-between'>

            <RadioGroup className='flex items-center gap-4 my-5' >
              <div className="flex items-center space-x-2">
                <Input type="radio" name="role" value="student" checked={input.role === "student"} onChange={changeEventhandler} className='cursor-pointer' />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input type="radio" name="role" value="recruiter" checked={input.role === "recruiter"} onChange={changeEventhandler} className='cursor-pointer' />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className='flex items-center gap-2'>
              <Label>Profile</Label>
              <Input accept="image/*"
                type="file"
                onChange={changeFile}
                className='cursor-pointer' />
            </div>
          </div>
          <div>
            {
            
            loading ? <Button className='w-full my-4'><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait</Button> : (
                <Button type="submit" className='w-full my-4'>Sign Up</Button>
              )
            }
            <span className='text-sm'>Already have an account?<Link to="/login" className='text-blue-600'>Login</Link></span>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Signup
