import {useState, useEffect} from "react"
import Skeleton from "react-loading-skeleton"
import {getSuggestedProfiles} from "../../services/firebase"
import SuggestedProfile from "./suggestedProfile"

const Suggestions = ({userId, following}) => {
    const [profiles, setProfiles] = useState(null)

    // get the suggested profiles
    useEffect(() => {
        async function suggestedProfiles() {
            const response = await getSuggestedProfiles(userId, following)
            setProfiles(response)
        }
        console.log("userId", userId)
        if (userId) {
            suggestedProfiles()
        }

        console.log(profiles)
    }, [userId])


    return !profiles ? (
        <Skeleton count={1} height={150} className="mt-5" />
    ) : profiles.length > 0 ? (
        <div>
            <div>
                <p>Suggestions for you</p>
            </div>
            <div>
              {profiles.map((profile) => (
                  <SuggestedProfile 
                    key={profile.docId}
                    userDocId={profile.docId}
                    profileId={profile.userId}
                    userId={userId}
                    username={profile.username}
                  />
              ))}  
            </div>
        </div>
    ) : null
}

export default Suggestions