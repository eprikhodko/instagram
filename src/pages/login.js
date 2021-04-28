import React, {useEffect, useState} from "react"
import {firebase} from "../lib/firebase"
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

    // user actions
    // happy & sad scenarios
    
    // what happens when a user clicks login? -> firebase
    // a async function that can handle login
    // handle a succesful login with 
    // await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
    
    // wrap the await function call to firebase in a try/catch
    // error: catch(error)
    // setError(error.message)
    
    // extra learnings: test.com
    // handle the email address validation client side
    // removes a network call!

    const handleSubmit = (event) => {
        event.preventDefault()

        async function handleLogin() {
            await firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
              // Signed in
              console.log("signed in")
              const user = userCredential.user
              // ...
            })
            .catch((error) => {
              const errorCode = error.code
              const errorMessage = error.message
            // save error message in state
              setError(errorMessage)
              console.log(errorCode)
            //   console.log(errorMessage)
            })
        }
        handleLogin(email, password)
        console.log(error)
    }



    return (
        <div className="container">
            <div className="container-login">
                <img className ="logo" src="./images/logo.png" alt="Instagram logo" />

                <form method="POST" className="container-form" onSubmit={handleSubmit}>
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