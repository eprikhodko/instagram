import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import * as ROUTES from "../constants/routes"
import "../styles/login.css"

const Login = () => {

    // set page title
    useEffect(() => {
        document.title = "Login - Instagram"
    },[])

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const isInvalid = password === "" || email === ""

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
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <input 
                        aria-label="Enter your password"
                        className="input-login"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <button 
                        type="submit"
                        className="button-login font-bold"
                        disabled={!isInvalid ? "" : "disabled"}
                        style={{
                            opacity: !isInvalid ? "100%" : "50%",
                            cursor: !isInvalid ? "" : "not-allowed"
                        }}
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