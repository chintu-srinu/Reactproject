// import Cookie  from "js-cookie"


// const removeCookie=(cookiename)=>{
//     Cookie.remove(cookiename)
// }
// export default removeCookie;

import Cookie from "js-cookie";

const removeCookie = (cookieName) => {
  Cookie.remove(cookieName, { path: "/" });
};

export default removeCookie;
