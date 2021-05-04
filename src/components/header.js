import React, { useContext } from "react"
import {Link} from "react-router-dom"
import FirebaseContext from "../context/firebase"
import UserContext from "../context/user"
import * as ROUTES from "../constants/routes"

import {ReactComponent as IconHome} from "../icons/home.svg"
import {ReactComponent as IconSignOut}  from "../icons/logout.svg"

import "../styles/header.css"

const Header = () => {
    const {firebase} = useContext(FirebaseContext) 
    const {user} = useContext(UserContext)

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
                                <IconHome 
                                    className="icon-header" 
                                    title="Home"
                                />
                            </Link>

                            <IconSignOut 
                                className="icon-signout" 
                                width="22px"
                                title="Sign Out"
                                onClick={() => firebase.auth().signOut()}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        firebase.auth().signOut()
                                    }
                                }}
                            />

                            <Link to={`/p/${user.displayName}`} className="link-profile">
                                <img
                                    className="avatar-header"
                                    src={`/images/avatars/${user.displayName}.jpg`}
                                    alt={`${user.displayName} profile avatar`}
                                />
                            </Link>
                        </>
                    ):(
                        < >
                            <Link to={ROUTES.LOGIN}>
                                <button 
                                    type="button"
                                    className="button-login"
                                    >
                                        Log In
                                </button>
                            </Link>
                           
                           <Link to={ROUTES.SIGN_UP}>
                            <button 
                                    type="button"
                                    className="button-signup"
                                    >
                                        Sign Up
                                </button>
                           </Link>
                    </>
                    )}
                    
                </div>
            </div>
        </header>
    )
}

export default Header