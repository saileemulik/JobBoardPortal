import React, {createContext, useEffect, useState } from "react";
import { useContext } from "react";
export const AuthContext = createContext();
export const AuthProvider = ({children}) =>{

const [token, setToken ] = useState(localStorage.getItem("token"));
const [user , setUser] = useState("");
const [listing , setListing] = useState("");
    const storeTokenInLS = (serverToken) =>{ 
        setToken(serverToken);
        return localStorage.setItem("token",serverToken);
     };

     let isLoggedIn = !!token;
     console.log("isLoggedIn",isLoggedIn);

const LogoutUser = ()=>{
    setToken("");
    return localStorage.removeItem("token");
}

const userAuthentication = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("user data", data.userData);
        setUser({ ...data.userData });
      }
    } catch (error) {
      console.log("Error fetching", error);
    }
  };
  

const getListings = async()=>{
    try {
        const response = await fetch("http://localhost:5000/api/data/listing",{
            method: "GET",
            
        });
     
        if(response.ok){
            const data = await response.json();
           console.log(data.msg);
           setListing(data.msg);
       
        } 
      
    } catch (error) {
        console.log(`Listings error ${error}`);
    }
        

};

useEffect (() =>{
    getListings();
    userAuthentication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [ ]);
 
     return (<AuthContext.Provider value={{isLoggedIn , storeTokenInLS, LogoutUser, user, listing }}>
        {children}
     </AuthContext.Provider>);
};
export const useAuth =()=>{
    const authContextValue = useContext(AuthContext);
    if(!authContextValue){
        throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
}