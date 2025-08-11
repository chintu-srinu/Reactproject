// import Cookie  from "js-cookie"


// const setCookie=(cookiename,token)=>{
//     Cookie.set(cookiename,token,{
//         expires: 1,
//         secure: true,
//         sameSite: "strict",
//         path: "/"

//     })
// }
// export default setCookie;

import Cookie from "js-cookie";

const setCookie = (cookieName, token) => {
  Cookie.set(cookieName, token, {
    expires: 1, // 1 day
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
};

export default setCookie;
