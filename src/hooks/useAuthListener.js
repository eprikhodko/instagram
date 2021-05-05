// this hook is listening if user is logged in or logged out

import {useState, useEffect, useContext} from "react"
import FirebaseContext from "../context/firebase"

const useAuthListener = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("authUser")))
    const {firebase} = useContext(FirebaseContext)
    
    useEffect(() => {
        const listener = firebase.auth().onAuthStateChanged((authUser) => {
            // if we have authenticated user, we can store this user in localstorage
            if(authUser) {
                localStorage.setItem("authUser", JSON.stringify(authUser))
                setUser(authUser)
            // if we don't have authenticated user, then clear localstorage
            } else {
                localStorage.removeItem("authUser")
                setUser(null)
            }
        })
        
        // clean up our listener
        return () => listener()

    }, [firebase])

    return {user}
}

export default useAuthListener