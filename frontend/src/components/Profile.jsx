import React, { useState } from 'react'
import Navbar from './shared/navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Contact, Mail, Pen } from 'lucide-react'
import {Button} from "./ui/button"
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobsTable'
import { UpdateProfileDialog } from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
const skills = ["Html", "Css", "Javascript", "Reactjs"]
export const Profile = () => {
  const [open,setopen]=useState(false)
     const isResume=true
     const {user} = useSelector(store=>store.auth);
  return (
    <div>
      <Navbar/>
        <div className='max-w-4xl mx-auto rounded-2xl bg-white border border-gray-200 my-5 p-8'>
               <div className='flex justify-between'>
               <div className='flex items-center gap-4'>
              <Avatar className='h-24 w-24 '>
            <AvatarImage src='https://static.vecteezy.com/system/resources/previews/019/897/563/non_2x/modern-real-estate-and-construction-logo-free-png.png' />
             </Avatar>
             <div>
             <h1 className='font-medium text-xl'>{user?.fullname}</h1>
             <p>{user?.profile?.bio}</p>
             </div>
             </div>
             <Button className='text-right' variant='outline' onClick={()=>{
                 setopen(true) 
             }}><Pen/></Button>
               </div>
              <div className='my-5'>
                 <div className='flex items-center gap-3 my-2'>
                 <Mail/>
                 <span>{user?.email}</span>
                 </div>
                  <div className='flex items-center gap-3 my-2'>
                  <Contact/>
                  <span>{user?.phoneNumber}</span>
                  </div>
              </div>
              <div>
                  <h1>Skills</h1>
                  <div className='flex items-center gap-1'>
                  {
                  user?.profile?.skills.length!=0?user?.profile?.skills.map((item,index)=>{
                          return (
                             <Badge key={index}>{item}</Badge>
                          )
                    }):<span>NA</span>
                   }
                  </div>    
              </div>
              <div className='grid w-full max-w-sm items-center gap-1.5'>
                   <Label className='font-bold text-md'>Resume</Label>
                   {
                    isResume?<a target='blank' href={user?.profile?.resume} className='text-blue-500  w-full hover:underline cursor-pointer'>{user.profile.resumeOriginalName}</a>:<span>NA</span>
                   }
              </div>
              <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                    <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                     <AppliedJobTable/>
              </div>
              <UpdateProfileDialog open={open} setopen={setopen}/>
        </div>
    </div>
  )
}
