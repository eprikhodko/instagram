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
        .firestore()
        .collection("users")
        .where("username", "==", username)
        .get()
    // console.log(result)
    // console.log(result.docs.map((user) => user.data().username)) 
    // console.log(result.docs.map((user) => user.data().length > 0))
    return result.docs.map((user) => user.data().length > 0)
}

export default doesUsernameExist