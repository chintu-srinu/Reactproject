// import { setCompanies} from '@/redux/companySlice'
// import { COMPANY_API_END_POINT} from '@/utils/constant'
// import axios from 'axios'
// import { useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import Cookie from "js-cookie";

// const useGetAllCompanies = () => {
//      let token=Cookie.get("token")
//     const dispatch = useDispatch();
//     useEffect(()=>{
//         const fetchCompanies = async () => {
//             try {
//                 const res = await axios.get(`${COMPANY_API_END_POINT}/get`,{withCredentials:true,headers: { Authorization: `Bearer ${token}` }});
//                 console.log('called');
//                 if(res.data.success){
//                     dispatch(setCompanies(res.data.companies));
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         fetchCompanies();
//     },[])
// }

// export default useGetAllCompanies



// import { setCompanies } from '@/redux/companySlice';
// import { COMPANY_API_END_POINT } from '@/utils/constant';
// import axios from 'axios';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import Cookie from 'js-cookie';

// const useGetAllCompanies = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchCompanies = async () => {
//       try {
//         // Get token inside the function to get latest value
//         const token = Cookie.get('token');

//         const res = await axios.get(
//           `${COMPANY_API_END_POINT}/get`,
//           {
//             withCredentials: true,
//             headers: {
//               Authorization: token ? `Bearer ${token}` : '', // send token if available
//             },
//           }
//         );
//         console.log('called');
//         if (res.data.success) {
//           dispatch(setCompanies(res.data.companies));
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchCompanies();
//   }, [dispatch]);
// };

// export default useGetAllCompanies;


import { setCompanies } from '@/redux/companySlice';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Cookie from 'js-cookie';

const useGetAllCompanies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = Cookie.get('token');  // Good — token fetched inside function

        const res = await axios.get(
          `${COMPANY_API_END_POINT}/get`,
          {
            withCredentials: true,
            headers: {
              Authorization: token ? `Bearer ${token}` : '',
            },
          }
        );
        console.log('called');
        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCompanies();
  }, [dispatch]);
};

export default useGetAllCompanies;
