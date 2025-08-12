// import { setSingleCompany } from '@/redux/companySlice'
// import { setAllJobs } from '@/redux/jobSlice'
// import { COMPANY_API_END_POINT} from '@/utils/constant'
// import axios from 'axios'
// import { useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import Cookie from "js-cookie";

// const useGetCompanyById = (companyId) => {
//      let token=Cookie.get("token")
//     const dispatch = useDispatch();
//     useEffect(()=>{
//         const fetchSingleCompany = async () => {
//             try {
//                 const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`,{withCredentials:true,headers: { Authorization: `Bearer ${token}` }});
//                 console.log(res.data.company);
//                 if(res.data.success){
//                     dispatch(setSingleCompany(res.data.company));
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         fetchSingleCompany();
//     },[companyId, dispatch])
// }

// export default useGetCompanyById


import { setSingleCompany } from '@/redux/companySlice'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Cookie from "js-cookie";

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const token = Cookie.get("token");  // <-- moved inside function
                const res = await axios.get(
                    `${COMPANY_API_END_POINT}/get/${companyId}`,
                    {
                        withCredentials: true,
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                console.log(res.data.company);
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.log(error);
            }
        };
        if (companyId) {
            fetchSingleCompany();
        }
    }, [companyId, dispatch]);
};

export default useGetCompanyById;
