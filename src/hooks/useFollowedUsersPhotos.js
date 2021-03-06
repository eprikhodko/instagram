import {useContext, useState, useEffect} from "react"
import {getUserByUserId, getUserFollowedPhotos} from "../services/firebase"
import UserContext from "../context/user"

const useFollowedUsersPhotos = () => {
    const [photos, setPhotos] = useState(null)
    // Import the "UserContext" and destructure out the "uid" from the user object and alias the "uid" to "userId"--setting a default value of an empty string for userId
    const {user: {uid: userId = ""}} = useContext(UserContext)

    useEffect(() => {
        async function getTimelinePhotos() {
            const followingUserIds = await getUserByUserId(userId)

            if (followingUserIds && followingUserIds[0].following.length > 0) {
                const followedUserPhotos = await getUserFollowedPhotos(userId, followingUserIds[0].following)
                
                followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated)
                setPhotos(followedUserPhotos)
            }
         }
        
        getTimelinePhotos()
    }, [userId])

    return {photos}
}

export default useFollowedUsersPhotos