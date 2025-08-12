// import { setAllAdminJobs } from '@/redux/jobSlice'
// import { JOB_API_END_POINT } from '@/utils/constant'
// import axios from 'axios'
// import { useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import Cookie from "js-cookie";

// const useGetAllAdminJobs = () => {
//      let token=Cookie.get("token")
//     const dispatch = useDispatch();
//     useEffect(()=>{
//         const fetchAllAdminJobs = async () => {
//             try {
//                 const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`,{withCredentials:true,headers: { Authorization: `Bearer ${token}` }});
//                 if(res.data.success){
//                     dispatch(setAllAdminJobs(res.data.jobs));
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         fetchAllAdminJobs();
//     },[])
// }

// export default useGetAllAdminJobs



import { setAllAdminJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Cookie from 'js-cookie';

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const token = Cookie.get('token');  // <-- move token read inside function

        const res = await axios.get(
          `${JOB_API_END_POINT}/getadminjobs`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllAdminJobs();
  }, [dispatch]);
};

export default useGetAllAdminJobs;
