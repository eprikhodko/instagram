import React, { useEffect } from "react"
import {Link} from "react-router-dom"
import * as ROUTES from "../constants/routes"
import "../styles/login.css"

const Login = () => {
    
    // set page title
    useEffect(() => {
        document.title = "Login - Instagram"
    },[])

    return(
        <div className="container">
            <div className="container-login">
                <img className ="logo" src="./images/logo.png" alt="Instagram logo" />

                <form method="POST" className="container-form">
                    <input 
                        aria-label="Enter your email address"
                        className="input-login"
                        type="text"
                        placeholder="Email address"
                    />
                    <input 
                        aria-label="Enter your password"
                        className="input-login"
                        type="password"
                        placeholder="Password"
                    />
                    <button 
                        type="submit"
                        className="button-login font-bold"
                    >
                        Log In
                    </button>
                </form>
            </div>
            <div className="container-login container-signup">
                <p>
                    Don't have an account?{' '}
                    <Link to={ROUTES.SIGN_UP} className="font-bold link link-signup">
                        Sign up
                    </Link>
                </p>
            </div>
        </div> 
    )
}

export default Login