import React, { useContext } from "react"
import {Link} from "react-router-dom"
import FirebaseContext from "../context/firebase"
import * as ROUTES from "../constants/routes"
import "../styles/header.css"

const Header = () => {
    const {firebase} = useContext(FirebaseContext)
    const user = "raphael"

    return (
        <header>
            <div className="container-header">
                <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                    <img className="logo-instagram" src="./images/logo-instagram.png" alt="Instagram logo"/>
                </Link>
                <div className="container-buttons">
                    {user ? (
                        < >
                             <Link to={ROUTES.DASHBOARD} arial-label="Home">
                                    <p>Dashboard</p>
                                </Link>
                            <button 
                                type="button"
                                className="button-sign-up"
                                title="Sign Out"
                                onClick={() => firebase.auth().signOut()}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        firebase.auth().signOut()
                                    }
                                }}
                                >
                                    Sign Out
                            </button>
                            <Link to={`/p/${user.displayName}`}>
                                <img
                                    className="header-avatar"
                                    src={`/images/avatars/${user.displayName}.jpg`}
                                    alt={`${user.displayName} profile avatar`}
                                />
                            </Link>
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