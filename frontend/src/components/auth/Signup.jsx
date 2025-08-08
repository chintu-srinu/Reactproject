


import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { setLoading } from "@/redux/authSlice";

import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) formData.append("file", input.file);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}`, formData, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?fit=crop&w=1400&q=80')",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        backgroundBlendMode: "overlay",
      }}
    >
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto px-4 py-12">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-xl bg-white bg-opacity-95 shadow-2xl p-10 rounded-2xl backdrop-blur-md"
        >
          <h1 className="font-bold text-3xl text-gray-800 text-center mb-8">
            Create Your Account
          </h1>

          {/* Fullname */}
          <div className="mb-4">
            <Label className="text-gray-700">Full Name</Label>
            <Input
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              placeholder="Your full name"
              className="mt-1"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <Label className="text-gray-700">Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="example@domain.com"
              className="mt-1"
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <Label className="text-gray-700">Phone Number</Label>
            <Input
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              placeholder="e.g., +91-9876543210"
              className="mt-1"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <Label className="text-gray-700">Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Enter a secure password"
              className="mt-1"
            />
          </div>

          {/* Role */}
          <div className="mb-6">
            <Label className="text-gray-700 block mb-2">Role</Label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-gray-800">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                />
                Student
              </label>
              <label className="flex items-center gap-2 text-gray-800">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                />
                Recruiter
              </label>
            </div>
          </div>

          {/* File */}
          <div className="mb-6">
            <Label className="text-gray-700">Profile Picture</Label>
            <Input
              accept="image/*"
              type="file"
              onChange={changeFileHandler}
              className="mt-1"
            />
          </div>

          {/* Button */}
          {loading ? (
            <Button disabled className="w-full bg-blue-600 hover:bg-blue-700">
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              Please wait...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Signup
            </Button>
          )}

          {/* Link to Login */}
          <p className="text-sm text-gray-700 text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>

      {/* Responsive style for mobile */}
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

export default Signup;
