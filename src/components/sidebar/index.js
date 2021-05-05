import React from "react"
import useUser from "../../hooks/useUser"

const Sidebar = () => {
    const {user: {fullName, username, userId}} = useUser()

    return (
        <p>This is Sidebar</p>
    )
}

export default Sidebar