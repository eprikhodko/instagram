import { firebase, FieldValue } from "../lib/firebase"


// after we're call doesUsernameExist function from signup.js, it calls 
// firebase.firestore().collection("users").where("username", "==", username).get()
// then function above search for a user with provided from signup.js username
// it then return a result, which is object
// in this object we have property .docs, which is array(?)
// we then can map through this array, and return either [false], which length is 1, or [], which length is 0
// length of 1 means user already exist, length of 0 means that user is not exist
const doesUsernameExist = async (username) => {
    const result = await firebase
        // call firestore
        .firestore()
        // once we're inside of firestore, tell firebase to go into "users" collection
        .collection("users")
        // once we're in that collection, we want to do a conditional check, see reference below:
        // https://firebase.google.com/docs/firestore/query-data/queries
        .where("username", "==", username)
        // get this result
        .get()
    // we're then return an array of docs, and we map through this array of docs, and return docs which fields are greater then 0 
    return result.docs.map((user) => user.data().length > 0)
}

// we have firebase Authentication and we have firebase Storage. How can we get user from Firestore, based on user authenication? We're using a useUser hook for this, and getUserByUserId function below
// we're pass a uid to the getUserByUserId service function, from user.uid context in useUser hook
// we then get a user with that uid, from Firestore "users" collection
///////////////////////////////////////////////////////////////////////////////
// get user from Firestore where userId == userId (passed from the firebase Authentication)
const getUserByUserId = async (userId) => {
    const result = await firebase
        .firestore()
        .collection("users")
        .where("userId", "==", userId)
        .get()

    const user = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }))
    // we can now return a user with matching with firebase Authenication uid from firebase Firestore "users" collection
    return user
}

const getSuggestedProfiles = async (userId, following) => {
    // get 10 users from Firestore "users" collection
    const result = await firebase
        .firestore()
        .collection("users")
        .limit(10)
        .get()
    
    return result.docs
        .map((user) => ({...user.data(), docId: user.id}))
        // filter out current logged in user profile, so it won't showing in suggested profiles
        // filter out profiles that we're already following
        .filter((profile) => profile.userId !== userId && !following.includes(profile.userId))
}

export {doesUsernameExist, getUserByUserId, getSuggestedProfiles}