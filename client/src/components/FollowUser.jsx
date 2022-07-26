import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import Default from '../assets/default.png'
import axios from "../utils/axios"
import FollowButton from './FollowButton'
import { getUser } from '../api/requests/requests'

function App({ id }) {

    const currentUser = useSelector(state => state.user)
    const [user, setUser] = useState(null)
    const navigate = useNavigate()


    useEffect(() => {
        getUser({ id }, setUser)
    }, [])

    if (!user) return;

    return (
        <div className='flex items-center justify-start gap-2 px-4 py-3 mt-2 w-full cursor-pointer transition-all hover:bg-[#080808] '>
            
            <img src={user.photo ?? Default} onClick={() => navigate(`/${user.username}`)} className="!h-[48px] !w-[48px] rounded-full self-start" alt="" />
            <div className='flex flex-col text-left' >
                <span onClick={() => navigate(`/${user.username}`)} className='text-sm font-bold hover:underline' > { user.name } </span>
                <span className='text-sm text-[#54595D] ' >@{user.username}</span>
                <span className='text-sm min-h-[20px] ' > {user.description} </span>
            </div>

            {currentUser.id == user.id ?
                <div></div> :
                <FollowButton user={user} active={user} />
            }

        </div >


    )
}

export default App