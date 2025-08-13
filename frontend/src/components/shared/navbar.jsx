import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import  { LogOut,User2 } from 'lucide-react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useDispatch, useSelector } from 'react-redux'
import store from '../../redux/store'
import { toast } from 'sonner'
import { USER_API_ENDPOINT } from '../../utils/constant'
import { setUser } from '../../redux/authslice'
import axios from 'axios'
const Navbar = () => {
    const {user}=useSelector(store=>store.auth);
    const dispatch=useDispatch()
    const navigate=useNavigate()
     const logoutHandler=async (e)=>{
        try {
            const res=await axios.get(`${USER_API_ENDPOINT}/logout`,{
                  withCredentials:true
            })
            if(res.data.success){
                  dispatch(setUser(null))
                  navigate("/")
                  toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
     }
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'>Job<span className='text-[#f83002]'>Portal</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='font-medium flex items-center gap-5'>
                                                   
                    {
                            user && user.role === "recruiter" ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                    <li><Link to="/browse">Browse</Link></li>
                                </>
                            )
                        }
                    </ul>
                    {
                        !user?(
                             <div className='flex items-center gap-2'>
                                <Link to='/login'><Button variant='outline'>LogIn</Button></Link>
                                <Link to='/signup'><Button className='bg-[#6A38C2] hover:bg-[#5B30a6]'>SignUp</Button></Link>
                                
                             </div>
                        ):(
                            <Popover >
                            <PopoverTrigger asChild>
                                <Avatar className='cursor-pointer'>
                                     
                                    <AvatarImage  alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className='w-80'>
                                <div className='flex gap-4 space-y-2'>
                                <Avatar className='cursor-pointer'>
                                    <AvatarImage  alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div>
                                <h4 className='font-medium'>{user.fullname}</h4>
                                
                                </div>
                                </div>
                                 <div className='flex flex-col my-2 text-gray-600'>
                                 {
                                                user && user.role === 'student' && (
                                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                        <User2 />
                                                        <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
                                                    </div>
                                                )
                                            }
                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                    <LogOut/>
                                    <Button onClick={logoutHandler} variant="link">Log Out</Button>
                                 </div>
                                 </div>
                                
                            </PopoverContent>
                        </Popover>
                        )
                    }
                
                </div>
            </div>
        </div>
    )
}
export default Navbar
