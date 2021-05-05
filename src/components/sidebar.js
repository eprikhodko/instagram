import React from "react"
import useUser from "../hooks/useUser"

const Sidebar = () => {
    // try to say const x = useUser(), and then console.log(x)
    // you will see an object, that is a user from Firestore "users" collection, that useUser hook is getting for us.
    // we can then destructure user from this object, by saying const {user} = useUser()
    // we can also console.log(user)
    // we can go and destructure user even futher, by saying
    // const {user: {fullName, username, userId}} = useUser()
    // console.log(fullName, username, userId)
    // by saying this we will extract and have access to all properties we need from user object from Firestore "users" collection.

    // why do we need this values? We need them to use them in suggestions in Sidebar component. We don't want to suggest somebody we're already following. We also need this values to build our user Profile component.

    const {user: {fullName, username, userId}} = useUser()

    return (
        <p>This is Sidebar</p>
    )
}

export default Sidebar