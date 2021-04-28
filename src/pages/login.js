import React, {useEffect, useState, useContext} from "react"
import FirebaseContext from "../context/firebase"
import {Link, useHistory} from "react-router-dom"
import * as ROUTES from "../constants/routes"
import "../styles/login.css"

const Login = () => {

    // set page title
    useEffect(() => {
        document.title = "Login - Instagram"
    },[])

    const history = useHistory()
    // extract firebase with destructuring from Context object
    const {firebase} = useContext(FirebaseContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState("")
    const isInvalid = password === "" || password.length < 6 || email === ""

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
            // redirect user to the Dasboard in case of successful login
            history.push(ROUTES.DASHBOARD)
        } catch (error){
            setEmail("")
            setPassword("")
            setError(error.message)
        }
    }

    return (
        <div className="container">
            <div className="container-login">
                <img className ="logo" src="./images/logo.png" alt="Instagram logo" />
                {error && <p className="paragraph-error">
                    {error} 
                    <br/>
                    <br/>
                    Please try again.
                </p>}
                <form method="POST" className="container-form" onSubmit={handleLogin}>
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
                        className={`button-login font-bold ${isInvalid && "button-disabled"}`}
                        disabled={isInvalid}
                    >
                        Log In
                    </button>
                </form>
            </div>
            <div className="container-login container-signup">
                <p>
                    Don't have an account?{" "}
                    <Link to={ROUTES.SIGN_UP} className="font-bold link link-signup">
                        Sign up
                    </Link>
                </p>
            </div>
        </div> 
    )
}

export default Login