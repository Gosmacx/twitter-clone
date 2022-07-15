import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../store/user";
import axios from "../utils/axios";

function App({ active, user, followersCallback, followingCallback }) {

    const [fLoading, setfLoading] = useState(false)
    const [text, setText] = useState("Takip ediliyor")
    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])
    const currentUser = useSelector(state => state.user)
    const dispatch = useDispatch()

    useState(() => {
        if (user) {
            setFollowers(user.followers)
            setFollowing(user.following)
        }
    }, [user])

    const follow = () => {
        if (fLoading) return;
        setfLoading(true)
        axios.post("/follow", { followToId: user.id, id: currentUser.id }, currentUser.token)
            .then(response => {
                if (!response.data) return


                const fToFollowing = response.data.followToUser.following
                const fToFollowers = response.data.followToUser.followers

                const userFollowers = response.data.user.followers
                const userFollowing = response.data.user.following

                if (followersCallback) followersCallback(fToFollowers)
                if (followingCallback) followingCallback(fToFollowing)

                setFollowing(fToFollowing)
                setFollowers(fToFollowers)
                dispatch(updateUser({
                    followers: userFollowers,
                    following: userFollowing
                }))

                setfLoading(false)
            }).catch(() => setfLoading(false))
    }


    if (active) return (
        <div className="ml-auto" >
            {followers.includes(`${currentUser.id}`) ?
                <button onMouseEnter={() => setText("Takibi bırak")} onMouseLeave={() => setText("Takip ediliyor")} onClick={follow} className='w-[120px] h-[30px] rounded-3xl border border-gray-600 flex items-center justify-center transition-all ml-auto hover:bg-red-600 hover:bg-opacity-10 ' >
                    {fLoading ?
                        <div className='w-4 h-4 border-2 border-gray-600 border-t-[#1d9bf0] animate-spin rounded-full ' ></div> :
                        <span className='text-white text-sm font-semibold ' > {text} </span>
                    }
                </button> :
                <button onClick={follow} className='w-[87px] h-[32px] rounded-3xl bg-white flex items-center justify-center transition-all ml-auto hover:bg-[#EFF3F4] ' >
                    {fLoading ?
                        <div className='w-4 h-4 border-2 border-gray-600 border-t-[#1d9bf0] animate-spin rounded-full ' ></div> :
                        <span className='text-[#0F1419] text-sm font-semibold ' > Takip et </span>
                    }
                </button>
            }
        </div>
    )

}

export default App