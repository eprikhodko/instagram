import React from "react"
import {Link} from "react-router-dom"
import FirebaseContext from "../context/firebase"
import * as ROUTES from "../constants/routes"
import "../styles/header.css"

const Header = () => {
    return (
        <header>
            <div className="container-header">
                <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                    <img className="logo-instagram" src="./images/logo-instagram.png" alt="Instagram logo"/>
                </Link>
                <div className="container-buttons">
                    <button 
                        type="button"
                        className="button-login font-bold"
                        >
                            Log In
                    </button>
                    <button 
                        type="button"
                        className="button-sign-up font-bold"
                        >
                            Sign up
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header