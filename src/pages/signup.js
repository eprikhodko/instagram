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
    const isInvalid = username === "" || fullname === "" || email === "" || password === "" || password.length < 6

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
            // redirect user to the Dasboard if login is successful
            history.push(ROUTES.DASHBOARD)
        } catch (error){
            setEmail("")
            setPassword("")
            setError(error.message)
        }
    }

    const handleSignUp = async (event) => {
        event.preventDefault()

        try {
           const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
           console.log(user)
        } catch (error) {
            setEmail("")
            setPassword("")
            setError(error.message)
            console.log(error)
        }
    }
    
    // # Challenge
    // Sign a user up to our Instagram clone

    // Acceptance Criteria
    //   - Create a 'handleSignUp' async function (the work inside the function must be in a try/catch) that uses the firebase -> auth -> function 'createUserWithEmailAndPassword' - see references!
    //   - Store the result of the creation into a variable ^^
    //   - Update the user's profile, specifically the 'displayName' field with the username that the user has inputted (which is stored in state)
    //   - Add a new user document to the collection of 'users' with the following values:

    //      - userId (value: take the 'uid' from the created user object -- e.g. createdUserResult.user.uid)
    //      - username
    //      - fullName
    //      - emailAddress
    //      - following: []
    //      - followers: []
    //      - dateCreated (use the time right now)

    // - If there's any errors, handle them! Make sure to clean out the form values as well

    // References
    //   - https://firebase.google.com/docs/auth/web/password-auth
    //   - https://cloud.google.com/firestore/docs/manage-data/add-data

    const handleUsernameChange = (event) => {
        // return value only matching ("^[a-z0-9]*$")
        // if we will add a space inside of brackets, like this: ("^[a-z0-9 ]*$"), we will be able to include spaces in a string. This is called Regular expressions, check MDN docs if you want to 
        event.target.value.match("^[a-z0-9]*$")!=null && setUsername(event.target.value.toLowerCase())
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
                <form method="POST" className="container-form" onSubmit={handleSignUp}>
                    <input 
                        aria-label="Enter your Username"
                        className="input-login"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    <input 
                        aria-label="Enter your Full Name"
                        className="input-login"
                        type="text"
                        placeholder="Full Name"
                        value={fullname}
                        onChange={(event) => setFullname(event.target.value)}
                        // we can also use this syntax:
                        // onChange={({ target }) => setFullname(target.value.toLowerCase())}
                        // here we're destructure target from event object. 
                        // try to console.log(event) at the end of handleUsernameChange() for example. You will see a SyntheticBaseEvent in a console, which has a target key, which has a value key, which has current input value
                    />
                    <input 
                        aria-label="Enter your email address"
                        className="input-login"
                        type="text"
                        placeholder="Email address"
                        value={email}
                        onChange={(event) => setEmail(event.target.value.toLowerCase())}
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