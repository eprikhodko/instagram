import React, {useEffect, useState, useContext} from "react"
import FirebaseContext from "../context/firebase"
import {Link, useHistory} from "react-router-dom"
import * as ROUTES from "../constants/routes"
import {doesUsernameExist} from "../services/firebase"
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


    const handleSignUp = async (event) => {
        event.preventDefault()

        // check if same username  already exist in database
        const usernameExists = await doesUsernameExist(username)

        // if usernameExists.length === 1, setError("This username is already taken.")
        // if usernameExists.length === 0, try to create user
        if (!usernameExists.length) {
            try {
                const createdUserResult = await firebase.auth().createUserWithEmailAndPassword(email, password)
     
                await createdUserResult.user.updateProfile({
                    displayName: username
                })
     
                await firebase.firestore().collection('users').add({
                    userId: createdUserResult.user.uid,
                    username: username.toLowerCase(),
                    fullname,
                    email: email.toLowerCase(),
                    following: [],
                    followers: [],
                    dateCreated: Date.now()
                })

                // redirect user to the Dasboard in case of successful sign up
                history.push(ROUTES.DASHBOARD)
     
             } catch (error) {
                 setEmail("")
                 setPassword("")
                 setError(error.message)
                 console.log(error)
             }
        } else {
            setUsername("")
            setPassword("")
            setError("This username is already taken.")
        }
    }

    const handleUsernameChange = (event) => {
        // return value only matching ("^[a-z0-9]*$")
        // if we will add a space inside of brackets, like this: ("^[a-z0-9 ]*$"), we will be able to include spaces in a string. This is called Regular expressions, check MDN docs for reference
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