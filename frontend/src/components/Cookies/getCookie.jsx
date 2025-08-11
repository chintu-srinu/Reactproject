// import Cookie  from "js-cookie"


// const getCookie=(cookiename)=>{
//     return Cookie.get(cookiename)
// }
// export default getCookie;

import Cookie from "js-cookie";

const getCookie = (cookieName) => {
  return Cookie.get(cookieName);
};

export default getCookie;
