// import React, { useState } from "react";
// import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
// import { Button } from "../ui/button";
// import { Avatar, AvatarImage } from "../ui/avatar";
// import { LogOut, User2, Menu } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { USER_API_END_POINTSS } from "@/utils/constant";
// import { setUser } from "@/redux/authSlice";
// import { toast } from "sonner";

// const Navbar = () => {
//   const { user } = useSelector((store) => store.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const logoutHandler = async () => {
//     try {
//       const res = await axios.get(`${USER_API_END_POINTSS}`, {
//         withCredentials: true,
//       });
//       if (res.data.success) {
//         dispatch(setUser(null));
//         navigate("/");
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response?.data?.message || "Logout failed");
//     }
//   };

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen((prev) => !prev);
//   };

  
//   const navLinks =
//     user && user.role === "recruiter" ? (
//       <>
//         <li>
//           <Link to="/admin/companies" onClick={() => setMobileMenuOpen(false)}>
//             Companies
//           </Link>
//         </li>
//         <li>
//           <Link to="/admin/jobs" onClick={() => setMobileMenuOpen(false)}>
//             Jobs
//           </Link>
//         </li>
//       </>
//     ) : (
//       <>
//         <li>
//           <Link to="/" onClick={() => setMobileMenuOpen(false)}>
//             Home
//           </Link>
//         </li>
//         <li>
//           <Link to="/jobs" onClick={() => setMobileMenuOpen(false)}>
//             Jobs
//           </Link>
//         </li>
//         <li>
//           <Link to="/browse" onClick={() => setMobileMenuOpen(false)}>
//             Browse
//           </Link>
//         </li>
//       </>
//     );

//   return (
//     <nav className="bg-white sticky top-0 z-50 shadow-sm">
//       <div className="flex items-center justify-between max-w-7xl mx-auto px-4 h-16">
//         {/* Logo */}
//         <div>
//           <h1 className="text-2xl font-bold">
//             Job<span className="text-[#F83002]">Portal</span>
//           </h1>
//         </div>

        
//         <ul className="hidden md:flex font-medium items-center gap-5">{navLinks}</ul>

      
//         <div className="flex items-center gap-4">
        

//           {!user ? (
//             <div className="hidden md:flex items-center gap-2">
//               <Link to="/login">
//                 <Button variant="outline">Login</Button>
//               </Link>
//               <Link to="/signup">
//                 <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button>
//               </Link>
//             </div>
//           ) : (
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Avatar className="cursor-pointer w-9 h-9">
//                   <AvatarImage
//                     src={
//                       user?.profile?.profilePhoto
//                         ? user.profile.profilePhoto
//                         : `https://i.pravatar.cc/150?u=${user.email || user.fullname}`
//                     }
//                     alt={user?.fullname || "User Avatar"}
//                   />
//                 </Avatar>
//               </PopoverTrigger>
//               <PopoverContent className="w-80">
//                 <div>
//                   <div className="flex gap-3 items-center mb-3">
//                     <Avatar>
//                       <AvatarImage
//                         src={
//                           user?.profile?.profilePhoto
//                             ? user.profile.profilePhoto
//                             : `https://i.pravatar.cc/150?u=${user.email || user.fullname}`
//                         }
//                         alt={user?.fullname}
//                       />
//                     </Avatar>
//                     <div>
//                       <h4 className="font-medium">{user?.fullname}</h4>
//                       <p className="text-sm text-muted-foreground">
//                         {user?.profile?.bio || "No bio available"}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex flex-col space-y-2 text-gray-600">
//                     {user.role === "student" && (
//                       <div className="flex items-center gap-2">
//                         <User2 size={18} />
//                         <Link to="/profile">
//                           <Button variant="link" className="p-0 h-auto text-left">
//                             View Profile
//                           </Button>
//                         </Link>
//                       </div>
//                     )}
//                     <div className="flex items-center gap-2">
//                       <LogOut size={18} />
//                       <Button
//                         variant="link"
//                         onClick={logoutHandler}
//                         className="p-0 h-auto text-left"
//                       >
//                         Logout
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               </PopoverContent>
//             </Popover>
//           )}

//           {/* Hamburger menu for mobile (only nav links) */}
//           <button
//             onClick={toggleMobileMenu}
//             className="md:hidden focus:outline-none"
//             aria-label="Toggle menu"
//           >
//             <Menu size={28} />
//           </button>
//         </div>
//       </div>

//       {mobileMenuOpen && (
//         <div className="md:hidden bg-white shadow-lg border-t border-gray-200">
//           <ul className="flex flex-col font-medium p-4 space-y-4">{navLinks}</ul>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;



import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINTSS } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINTSS}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const navLinks =
    user && user.role === "recruiter" ? (
      <>
        <li>
          <Link to="/admin/companies" onClick={() => setMobileMenuOpen(false)}>
            Companies
          </Link>
        </li>
        <li>
          <Link to="/admin/jobs" onClick={() => setMobileMenuOpen(false)}>
            Jobs
          </Link>
        </li>
      </>
    ) : (
      <>
        <li>
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/jobs" onClick={() => setMobileMenuOpen(false)}>
            Jobs
          </Link>
        </li>
        <li>
          <Link to="/browse" onClick={() => setMobileMenuOpen(false)}>
            Browse
          </Link>
        </li>
      </>
    );

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 h-16">
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex font-medium items-center gap-5">{navLinks}</ul>

        {/* Desktop Actions */}
        <div className="flex items-center gap-4">
          {!user ? (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer w-9 h-9">
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto
                        ? user.profile.profilePhoto
                        : `https://i.pravatar.cc/150?u=${user.email || user.fullname}`
                    }
                    alt={user?.fullname || "User Avatar"}
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div>
                  <div className="flex gap-3 items-center mb-3">
                    <Avatar>
                      <AvatarImage
                        src={
                          user?.profile?.profilePhoto
                            ? user.profile.profilePhoto
                            : `https://i.pravatar.cc/150?u=${user.email || user.fullname}`
                        }
                        alt={user?.fullname}
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio || "No bio available"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 text-gray-600">
                    {user.role === "student" && (
                      <div className="flex items-center gap-2">
                        <User2 size={18} />
                        <Link to="/profile">
                          <Button variant="link" className="p-0 h-auto text-left">
                            View Profile
                          </Button>
                        </Link>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <LogOut size={18} />
                      <Button
                        variant="link"
                        onClick={logoutHandler}
                        className="p-0 h-auto text-left"
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}

          {/* Hamburger menu for mobile */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden focus:outline-none"
            aria-label="Toggle menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-200">
          <ul className="flex flex-col font-medium p-4 space-y-4">
            {navLinks}

            {!user && (
              <div className="flex flex-col gap-2 pt-4 border-t border-gray-200">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] w-full">
                    Signup
                  </Button>
                </Link>
              </div>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

