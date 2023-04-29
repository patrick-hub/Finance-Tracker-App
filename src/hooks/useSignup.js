import { useState } from "react"
import { projectAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"


export const useSignup = () => {

    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const {dispatch} = useAuthContext()

    const signup =  async (email, password, displayName) => {
        setError(null)
        setIsPending(true)

        try {
            // signup user
           const res= await projectAuth.createUserWithEmailAndPassword(email, password) // creates a new user using fire base auth

           if (!res) {
            throw new Error('Could not complete Signup')
           }

           // Adding display Name to User
           await res.user.updateProfile({displayName})

           // dispatch login action
           dispatch ({type: 'LOGIN', payload: res.user})


           setIsPending(false)
           setError(false)

        }  catch (err) {
            console.log(err.message);
            setError(err.message)
            setIsPending(false)
    }
    }

    return {error, isPending, signup}
}