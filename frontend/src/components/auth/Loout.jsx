import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { setUser } from '@/redux/authSlice';
import { USER_API_END_POINTSS } from '@/utils/constant';
const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        
        await axios.get(USER_API_END_POINTSS, {
          withCredentials: true,
        });

        
        dispatch(setUser(null));

      
        toast.success("Logged out successfully");
        navigate("/");
      } catch (error) {
        toast.error("Logout failed");
        console.error(error);
      }
    };

    logoutUser();
  }, []);

  return null; 
};

export default Logout;
