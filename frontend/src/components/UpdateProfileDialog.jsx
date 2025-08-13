import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Loader2 } from 'lucide-react'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import store from '../redux/store'
import axios from 'axios'
import { USER_API_ENDPOINT } from '../utils/constant'
import { setUser } from '../redux/authslice'
import { toast } from 'sonner'
export const UpdateProfileDialog = ({open,setopen}) => {
    const [loading, setLoading] = useState(false);
    const {user}=useSelector(store=>store.auth);
    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.map(skill => skill) || "",
        file: user?.profile?.resume || ""
    });
    const dispatch=useDispatch();
    const changeEventhandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
      }
      const changeFile = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
      }
      const submitHandler=async (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
          formData.append("file", input.file);
        }
        try {
             setLoading(true)
            const res=await axios.post(`${USER_API_ENDPOINT}/profile/update`,formData,{
                withCredentials: true,
                headers: {
                  "Content-Type": "multipart/form-data"
                }
            })
            if(res.data.success){
                dispatch(setUser(res.data.user))
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error)
        }finally{
            setopen(false)
            setLoading(false)
        }
      }
    return (
    <div>
        <Dialog open={open}>
            <DialogContent className='sm:max-w-[425px]' onInteractOutside={() => setopen(false)}>
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={submitHandler} >
                    <div className='grid gap-4 py-4'>
                         <div className='grid grid-cols-4 items-center gap-4'>
                         <Label htmlFor="name" className='text-right'>Name</Label>
                         <Input
                           id="name"
                           value={input.fullname}
                           onChange={changeEventhandler}
                           className='col-span-3'
                           type="text"
                           name="fullname"
                          />
                         </div>
                         <div className='grid grid-cols-4 items-center gap-4'>
                         <Label htmlFor="email" className='text-right'>email</Label>
                         <Input
                           id="email"
                            value={input.email}
                           className='col-span-3'
                           type="email"
                           onChange={changeEventhandler}
                           name="email"
                          />
                         </div>
                         <div className='grid grid-cols-4 items-center gap-4'>
                         <Label htmlFor="number" className='text-right'>Number</Label>
                         <Input
                           id="number"
                           value={input.phoneNumber}
                           className='col-span-3'
                           type="text"
                           onChange={changeEventhandler}
                           name="phoneNumber"
                          />
                         </div>
                         <div className='grid grid-cols-4 items-center gap-4'>
                         <Label htmlFor="bio" className='text-right'>Bio</Label>
                         <Input
                           id="bio"
                           value={input.bio}
                           onChange={changeEventhandler}
                           className='col-span-3'
                           name="bio"
                          />
                         </div>
                         <div className='grid grid-cols-4 items-center gap-4'>
                         <Label htmlFor="skills" className='text-right'>Skills</Label>
                         <Input
                           id="skills"
                           value={input.skills}
                           onChange={changeEventhandler}
                           className='col-span-3'
                           name="skills"
                          />
                         </div>
                         <div className='grid grid-cols-4 items-center gap-4'>
                         <Label htmlFor="file" className='text-right'>Resume</Label>
                         <Input
                           id="file"
                           className='col-span-3'
                           name="file"
                           type="file"
                           onChange={changeFile}
                           accept="application/pdf"
                          />
                         </div>
                    </div>
                    <DialogFooter>
                            {
                                loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Update</Button>
                            }
                        </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </div>
  )
}
