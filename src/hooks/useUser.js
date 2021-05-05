// we're using an useUser hook to get a user object from Firestore, based on user id (uid), that is exist in the firebase Authentication

import {useState, useEffect, useContext} from "react"
import {getUserByUserId} from "../services/firebase"
import UserContext from "../context/user"

const useUser = () => {
    const [activeUser, setActiveUser] = useState({})
    const {user} = useContext(UserContext)

    useEffect(() => {
        async function getUserObjByUserId() {
            // getUserByUserId is a function that gets the user data based on the user id (uid)
            // we get a response as an array, which has a {user} object inside of it. We need to destructure response by putting it in a square brackets: [response]
            const [response] = await getUserByUserId(user.uid)
            setActiveUser(response)
        } 
        if (user && user.uid) {
            getUserObjByUserId()
        }
    }, [user])

    return {user: activeUser}
}

export default useUser