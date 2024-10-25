import { BACKEND_URL } from "@/app/config";
import axios from "axios";
import { useEffect, useState } from "react";

interface UserType {
    name : string,
    email?: string
}

export default function useFetchUser() {
    const [user, setUser] = useState<UserType>({
        name: "",
        email: "",
    })
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>()
   
    useEffect(()=>{
        const fetchuser = async ()=>{
           
            try {
              const token = localStorage.getItem('token');
              if(!token) throw new Error("No token Found");
              const res = await axios.get(`${BACKEND_URL}/user/`,{
                headers:{
                    Authorization: token
                }
              })
               if(!res.data){
                throw new Error("user not found")
               }
               setUser(res.data.user)
            } catch (error) {
                setError(JSON.stringify(error))
            }finally{
                setLoading(false)
            }
        }

        fetchuser();

    },[]);


    return { user, error, loading}
    
}