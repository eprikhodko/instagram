import React, {useEffect, useState, useContext} from "react"
import FirebaseContext from "../context/firebase"
import {Link, useHistory} from "react-router-dom"
import * as ROUTES from "../constants/routes"
import "../styles/signup.css"

const SignUp = () => {
    // set page title
    useEffect(() => {
        document.title = "Sign up - Instagram"
    },[])

    const history = useHistory()
    // extract firebase with destructuring from Context object
    const {firebase} = useContext(FirebaseContext)

    const [username, setUsername] = useState("")
    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState("")
    const isInvalid = password === "" || email === ""

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
                        aria-label="Enter your Username"
                        className="input-login"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                    <input 
                        aria-label="Enter your Full Name"
                        className="input-login"
                        type="text"
                        placeholder="Full Name"
                        value={fullname}
                        onChange={(event) => setFullname(event.target.value)}
                    />
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
                        Sign up
                    </button>
                </form>
            </div>
            <div className="container-login container-signup">
                <p>
                    Have an account?{" "}
                    <Link to={ROUTES.LOGIN} className="font-bold link link-signup">
                        Log in
                    </Link>
                </p>
            </div>
        </div> 
    )
}

export default SignUp