// import { setAllAppliedJobs } from "@/redux/jobSlice";
// import { APPLICATION_API_END_POINT } from "@/utils/constant";
// import axios from "axios"
// import { useEffect } from "react"
// import { useDispatch } from "react-redux"
// import Cookie from "js-cookie";

// const useGetAppliedJobs = () => {
//      let token=Cookie.get("token")
//     const dispatch = useDispatch();
//     useEffect(()=>{
//         const fetchAppliedJobs = async () => {
//             try {
//                 const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {withCredentials:true,headers: { Authorization: `Bearer ${token}` }});
//                 console.log(res.data);
//                 if(res.data.success){
//                     dispatch(setAllAppliedJobs(res.data.application));
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         fetchAppliedJobs();
//     },[])
// };
// export default useGetAppliedJobs;


import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import Cookie from "js-cookie";

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const token = Cookie.get("token");  // <-- moved inside function
                const res = await axios.get(
                    `${APPLICATION_API_END_POINT}/get`,
                    {
                        withCredentials: true,
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                console.log(res.data);
                if (res.data.success) {
                    dispatch(setAllAppliedJobs(res.data.application));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchAppliedJobs();
    }, [dispatch]);
};

export default useGetAppliedJobs;
