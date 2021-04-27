import React, {lazy, Suspense} from "react"

const Dashboard = lazy(() => import ('./pages/dashboard'))
const Login = lazy(() => import ('./pages/login'))
const SignUp = lazy(() => import ('./pages/signup'))
const Profile = lazy(() => import ('./pages/profile'))
const NotFound = lazy(() => import ('./pages/not-found.js'))

const App = () => {
    return(
        <Suspense fallback={<p>Loading...</p>}>
            <p>Here will be our content</p>
        </Suspense>
    )
}

export default App