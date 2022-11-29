import { createContext, useEffect, useState, useContext } from "react";
import { singInRequests, singUpRequests } from "../api/auth.api";

export const AuthContext = createContext();

export const useAuth = () => {
  const contextAuth = useContext(AuthContext);
  return contextAuth;
};

export function AuthContextProvider({ children }) {
  const [token, setToken] = useState("")
  const [roles, setRoles] = useState("")

  const getUser = async (user) => {
    const res = await singInRequests(user)
    setToken(res.data.token)
    setRoles(res.data.userFound.roles[0].name)
  };

  const createUser = async (user)=>{
    await singUpRequests(user)
  }

  useEffect(()=>{
    let data = localStorage.getItem("token")
    setToken(data) 
  },[])

  useEffect(()=>{
    let data = localStorage.getItem("roles")
    setRoles(data) 
  },[])

  useEffect(()=>{
    localStorage.setItem("token", token)
  }, [token])

   useEffect(()=>{
    localStorage.setItem("roles", roles)
  }, [roles])

  return (
    <AuthContext.Provider value={{getUser, token, roles, setRoles,setToken, createUser}}>
      {children}
    </AuthContext.Provider>
  );
}
