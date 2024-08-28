import { createContext, useEffect, useState } from "react";

export let UserContext = createContext();
export default function UserContextProvider(props) {
  const [userLogin, setuserLogin] = useState(
    localStorage.getItem("userToken") ? localStorage.getItem("userToken") : null
  );
  // useEffect(()=>{
  //   if(localStorage.getItem("userToken")){
  //     setuserLogin(localStorage.getItem("userToken"))
  //   }
  // },[]) // da s7
  return (
    <UserContext.Provider value={{ userLogin, setuserLogin }}>
      {props.children}
    </UserContext.Provider>
  );
}
