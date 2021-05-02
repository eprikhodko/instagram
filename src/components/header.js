import React, { useContext } from "react"
import {Link} from "react-router-dom"
import FirebaseContext from "../context/firebase"
import * as ROUTES from "../constants/routes"
 import "../styles/header.css"

const Header = () => {
    const {firebase} = useContext(FirebaseContext)
    const user = "null"

    return (
        <header>
            <div className="container-header">
                <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                    <img className="logo-instagram" src="./images/logo-instagram.png" alt="Instagram logo"/>
                </Link>
                <div className="container-buttons">
                    {user ? (
                        < >
                            <button 
                                type="button"
                                className="button-sign-up"
                                >
                                    Sign Out
                            </button>
                        </>
                    ):(
                        < >
                        <button 
                            type="button"
                            className="button-login"
                            >
                                Log In
                        </button>
                        <button 
                            type="button"
                            className="button-sign-up"
                            >
                                Sign Up
                        </button>
                    </>
                    )}
                    
                </div>
            </div>
        </header>
    )
}

export default Header