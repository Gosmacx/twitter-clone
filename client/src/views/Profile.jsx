import Default from '../assets/default.png'
import back from '../assets/back.svg'

import Loading from '../components/Loading'
import Tweet from '../components/Tweet'
import Hashtags from '../components/suggestions/Hashtags'
import SearchComp from '../components/suggestions/Search'
import UsersBox from '../components/suggestions/UsersBox'
import EditProfile from '../components/EditProfile'
import FollowButton from '../components/FollowButton'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from '../utils/axios'
import { getUser, getTweets } from '../api/requests/requests'


function App() {
    const currentUser = useSelector(state => state.user)
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    const params = useParams()

    const [tweets, setTweets] = useState([])
    const [loading, setLoading] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [selfMode, setSelfMode] = useState(false)
    const [followers, followersCallback] = useState([])
    const [following, followingCallback] = useState([])

    function EditComponent({ active, setEditMode }) {
        if (active) return (
            <EditProfile setEditMode={setEditMode} />
        )
    }

    function UserBanner({ banner }) {

        if (banner) {
            return <img src={banner} className="object-cover h-full w-full" alt="" />
        } else {
            return <div></div>
        }

    }

    function EditButton({ active }) {

        if (active) return (
            <button onClick={() => setEditMode(true)} className='w-[134px] rounded-3xl h-8 flex items-center justify-center border-2 border-[#323C44] transition-all hover:bg-[#181919] self-start ' >
                <span>Profili Düzenle</span>
            </button>
        )

    }

    const userManager = async () => {
        const data = await getUser({ username: params.username }, setUser)
        if (data) {
            followersCallback(data.followers)
            followingCallback(data.following)
            getTweets({ user: data.id }, setTweets, setLoading)
        } else {
            navigate("/home")
        }
    }

    useEffect(() => {

        if (params.username == currentUser.username) {
            setSelfMode(true)
            setUser(currentUser)
            followersCallback(currentUser.followers)
            followingCallback(currentUser.following)
            getTweets({ user: currentUser.id }, setTweets, setLoading)
            return;
        }

        if (user) return;
        userManager()

    }, [params, currentUser])


    return (
        <main className='w-full flex items-start' >
            <div className='min-w-full md:w-[990px] md:min-w-max relative' >
                <div className='w-full flex items-end justify-end gap-10 ' >

                    <EditComponent setEditMode={setEditMode} active={editMode} />


                    <div id='tweets' className='border-l md:w-[592px] w-full border-l-gray-500 border-r border-r-gray-500 border-opacity-50 self-start flex flex-col items-center' >

                        <div id='topbar' className='w-full relative h-[53px] flex items-center justify-center z-10' >
                            <div className='flex items-center h-[53px] fixed w-[85%]  md:w-[31%] px-4 gap-6' style={{ backdropFilter: 'blur(12px)', backgroundColor: 'rgba(0, 0, 0, 0.65)' }} >
                                <div onClick={() => navigate(-1)} className='transition-all hover:bg-[#181919] p-1 rounded-full cursor-pointer'>
                                    <img src={back} width='20' alt="" />
                                </div>
                                <div className='flex flex-col items-start justify-center' >
                                    <span className='font-bold text-xl' > {user?.name} </span>
                                    <span className='text-sm text-[#6A6F74]' > {tweets.length} Tweet</span>
                                </div>
                            </div>
                        </div>

                        {user ?
                            <div id='user-information' className='w-full flex flex-col justify-between relative pb-2' >
                                <div className='w-full h-[200px] relative bg-[#333639] ' >
                                    <UserBanner banner={user?.banner} />
                                </div>
                                <div className='flex flex-col items-center w-full ' >
                                    <div className='px-4 flex items-center justify-between w-full mt-3 relative' >
                                        <div className='bg-black w-[141px] h-[141px] rounded-full absolute -bottom-[90%] ' >
                                            <img src={user?.photo ?? Default} className="rounded-full  object-cover border-[4px] border-black " alt="" />
                                        </div>
                                        <div></div>
                                        <EditButton active={selfMode} />
                                        <FollowButton active={!selfMode} user={user} followersCallback={followersCallback} followingCallback={followingCallback} />
                                    </div>
                                    <div className='h-10 w-full' ></div>
                                </div>
                                <div className='flex flex-col items-start justify-center px-4 w-full' >
                                    <h1 className='text-lg font-bold' >{user?.name}</h1>
                                    <span className='text-[#71767B]' >@{user?.username}</span>
                                    <span className='mt-3' > {user?.description} </span>
                                    <div className='flex items-center justify-center mt-3 gap-4' >
                                        <Link to="following" className='text-sm hover:underline cursor-pointer ' ><strong> {following?.length} </strong> <span className='text-[#71767B]' >Takip edilen</span></Link>
                                        <Link to="followers" className='text-sm hover:underline cursor-pointer ' ><strong>{followers?.length} </strong> <span className='text-[#71767B]' >Takipçi</span></Link>
                                    </div>
                                </div>
                            </div> :
                            <div className='w-full self-start' ></div>
                        }

                        <div id='menu' className='w-full h-12 relative flex items-center border-b border-b-gray-500 border-opacity-50 mt-3' >

                            <div className='w-full h-full px-2 md:px-4 flex items-center justify-center transition-all hover:bg-[#181818] cursor-pointer ' >
                                <span className='font-bold h-full border-b-4 border-[#1d9bf0] flex items-center justify-center ' >Tweetler</span>
                            </div>
                            <div className='w-full h-full px-2 md:px-4 flex items-center justify-center transition-all hover:bg-[#181818] cursor-pointer' >
                                <span className='text-[#71767B] whitespace-nowrap ' >Tweetler ve yanıtlar</span>
                            </div>
                            <div className='w-full h-full px-2 md:px-4 flex items-center justify-center transition-all hover:bg-[#181818] cursor-pointer' >
                                <span className='text-[#71767B] whitespace-nowrap '>Medya</span>
                            </div>
                            <div className='w-full h-full px-2 md:px-4 flex items-center justify-center transition-all hover:bg-[#181818] cursor-pointer' >
                                <span className='text-[#71767B] whitespace-nowrap '>Beğeni</span>
                            </div>

                        </div>

                        <div id='mainTweets' className='w-full flex flex-col min-h-screen ' >
                            {loading ?
                                <Loading /> :
                                tweets.map((tweet, index) => {
                                    return (
                                        <Tweet id={tweet.user} key={index} content={tweet.content} date={tweet.date} />
                                    )
                                })
                            }
                        </div>

                    </div>


                    <div id='tags' className='!w-[350px] !min-w-[350px] hidden md:flex flex-col mr-[10px] gap-4 self-start' >
                        <SearchComp />
                        <div className='w-full !h-11 mb-2' ></div>
                        <UsersBox title="Bunları beğenebilirsin" />
                        <Hashtags />
                    </div>

                </div>
            </div>
        </main >
    )
}

export default App
