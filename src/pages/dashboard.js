import React, {useEffect} from "react"
import Header from "../components/header"
import Timeline from "../components/timeline"
import Sidebar from "../components/sidebar/index.js"
import "../styles/dashboard.css"

const Dashboard = () => {
    // set page title 
    useEffect(() => {
        document.title = "Instagram"
    }, [])

    return(
        <div>
            <Header />
            <div className="content-main">
                <Timeline />
                <Sidebar />
            </div>
        </div>
    )
}

export default Dashboard