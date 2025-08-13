import React, { useEffect } from 'react'  //custom Hook
import { JOB_API_ENDPOINT } from '../utils/constant'
import { useDispatch } from 'react-redux'
import { setAllJobs } from '../redux/jobslice'
import axios from 'axios'

const useGetAllJobs=()=>{
    
    const dispatch=useDispatch()
      useEffect(()=>{
          const fetchAllJobs=async ()=>{
              try {
                console.log("entering custom hook")
                const res=await axios.get(`${JOB_API_ENDPOINT}/get`,{
                     withCredentials:true
                })
                if(res.data.success){
                    dispatch(setAllJobs(res.data.jobs))
                }
              } catch (error) {
                console.log(error)
              }
          }
          fetchAllJobs();
      },[])
}
export default useGetAllJobs
