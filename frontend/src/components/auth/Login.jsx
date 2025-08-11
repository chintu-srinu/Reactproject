// import React, { useEffect, useState } from 'react';
// import Navbar from '../shared/Navbar';
// import { Label } from '../ui/label';
// import { Input } from '../ui/input';
// import { Button } from '../ui/button';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { USER_API_END_POINTS } from '@/utils/constant';
// import { toast } from 'sonner';
// import { useDispatch, useSelector } from 'react-redux';
// import { setLoading, setUser } from '@/redux/authSlice';
// import { Loader2 } from 'lucide-react';
// // import Cookie  from "js-cookie"
// import GetCookie from '../Cookies/getCookie';
// import RemoveCookie from '../Cookies/removeCookie';
// import SetCookie from '../Cookies/setcookie';

// const Login = () => {
//   const [input, setInput] = useState({
//     email: '',
//     password: '',
//     role: '',
//   });

//   const { loading, user } = useSelector((store) => store.auth);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch(setLoading(true));
//       const res = await axios.post(`${USER_API_END_POINTS}`, input, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         withCredentials: true,
//       });
//       if (res.data.success) {
//         // Cookie.set("token", res.data.usertoken, { expires: 1,secure:true,sameSite:"strict",path:"/" }); // Store token in cookies
//         // Cookie.get("token")
//         // Cookie.remove("token", { path: "/" }); // Remove token from cookies
//         RemoveCookie("token");
//         SetCookie("token", res.data.usertoken);
//         dispatch(setUser(res.data.user));
//         toast.success(res.data.message);
//         navigate('/');
//       }
//     } catch (error) {
//       toast.error(error?.response?.data?.message || 'Login failed');
//       console.log(error);
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       navigate('/');
//     }
//   }, []);

//   return (
//     <div
//       className="min-h-screen bg-cover bg-center"
//       style={{
//              backgroundImage: `url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?fit=crop&w=1400&q=80')` ,
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//         backgroundBlendMode: 'overlay',
//       }}
//     >
//       <Navbar />

//       <div className="flex items-center justify-center px-4 py-12">
//         <form
//           onSubmit={submitHandler}
//           className="w-full max-w-lg bg-white bg-opacity-90 shadow-xl p-8 rounded-lg backdrop-blur-md"
//         >
//           <h1 className="font-bold text-3xl text-gray-800 text-center mb-6">Login to Your Account</h1>

         
//           <div className="mb-4">
//             <Label className="text-gray-700">Email</Label>
//             <Input
//               type="email"
//               value={input.email}
//               name="email"
//               onChange={changeEventHandler}
//               className="mt-1"
//               placeholder="Enter your email"
//               required
//             />
//           </div>

         
//           <div className="mb-4">
//             <Label className="text-gray-700">Password</Label>
//             <Input
//               type="password"
//               value={input.password}
//               name="password"
//               onChange={changeEventHandler}
//               className="mt-1"
//               placeholder="Enter your password"
//               required
//             />
//           </div>

        
//           <div className="mb-6">
//             <Label className="text-gray-700 block mb-2">Role</Label>
//             <div className="flex gap-6">
//               <label className="flex items-center gap-2 text-gray-800">
//                 <Input
//                   type="radio"
//                   name="role"
//                   value="student"
//                   checked={input.role === 'student'}
//                   onChange={changeEventHandler}
//                 />
//                 Student
//               </label>
//               <label className="flex items-center gap-2 text-gray-800">
//                 <Input
//                   type="radio"
//                   name="role"
//                   value="recruiter"
//                   checked={input.role === 'recruiter'}
//                   onChange={changeEventHandler}
//                 />
//                 Recruiter
//               </label>
//             </div>
//           </div>

//           {/* Submit Button */}
//           {loading ? (
//             <Button className="w-full bg-blue-600 hover:bg-blue-700">
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
//             </Button>
//           ) : (
//             <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
//               Login
//             </Button>
//           )}

          
//           <p className="text-sm text-gray-700 text-center mt-4">
//             Don't have an account?{' '}
//             <Link to="/signup" className="text-blue-600 hover:underline">
//               Signup
//             </Link>
//           </p>
//         </form>
//       </div>

     
//       <style>{`
//         @media (max-width: 450px) {
//           form {
//             padding: 1.5rem !important;
//             width: 100% !important;
//             margin: 0 10px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Login;




import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINTS } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import getCookie from '../Cookies/getCookie';
import removeCookie from '../Cookies/removeCookie';
import setCookie from '../Cookies/setCookie';

const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
    role: '',
  });

  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINTS}`, input, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (res.data.success) {
        // const token = res.data.token;
        const token = res.data.token || res.data.usertoken || res.data.user?.usertoken;

        if (!token) {
          toast.error('No token received from server');
          return;
        }

        removeCookie("token"); // clear old token if any
        setCookie("token", token); // set new token in cookie

        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate('/');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Login failed');
      console.error("Login error:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?fit=crop&w=1400&q=80')`,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundBlendMode: 'overlay',
      }}
    >
      <Navbar />

      <div className="flex items-center justify-center px-4 py-12">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-lg bg-white bg-opacity-90 shadow-xl p-8 rounded-lg backdrop-blur-md"
        >
          <h1 className="font-bold text-3xl text-gray-800 text-center mb-6">Login to Your Account</h1>

          <div className="mb-4">
            <Label className="text-gray-700">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              className="mt-1"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <Label className="text-gray-700">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              className="mt-1"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="mb-6">
            <Label className="text-gray-700 block mb-2">Role</Label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-gray-800">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                />
                Student
              </label>
              <label className="flex items-center gap-2 text-gray-800">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                />
                Recruiter
              </label>
            </div>
          </div>

          {loading ? (
            <Button className="w-full bg-blue-600 hover:bg-blue-700" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Login
            </Button>
          )}

          <p className="text-sm text-gray-700 text-center mt-4">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Signup
            </Link>
          </p>
        </form>
      </div>

      <style>{`
        @media (max-width: 450px) {
          form {
            padding: 1.5rem !important;
            width: 100% !important;
            margin: 0 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
