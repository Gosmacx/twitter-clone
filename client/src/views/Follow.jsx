import back from '../assets/back.svg'

import Loading from '../components/Loading'
import FollowUser from '../components/FollowUser'
import Hashtags from '../components/suggestions/Hashtags'
import SearchComp from '../components/suggestions/Search'
import UsersBox from '../components/suggestions/UsersBox'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getTweets, getUser } from '../api/requests/requests'

function App() {
    const [user, setUser] = useState(null)

    const [currentMode, setCurrentMode] = useState([])
    const [tweets, setTweets] = useState(0)
    const [loading, setLoading] = useState(false)

    const params = useParams()
    const navigate = useNavigate()
    
    const activeClasses = "font-bold border-b-4 border-[#1d9bf0]"

    useEffect(() => {

        async function managePage() {
            const response = (data) => {
                setUser(data)
                if (params.type == 'following') setCurrentMode(data.following)
                else if (params.type == 'followers') setCurrentMode(data.followers);
                getTweets({ user: data.id }, setTweets)
            }
            await getUser({ username: params.username }, response, setLoading)
        }

        managePage()

    }, [params])



    return (
        <main className='w-full flex items-start' >

            <div className='min-w-full md:w-[990px] md:min-w-max relative' >
                <div className='w-full flex items-end justify-end gap-10  ' >

                    <div id='tweets' className='border-l md:w-[592px] border-l-gray-500 border-r border-r-gray-500 border-opacity-50 self-start w-full flex flex-col items-center min-h-screen ' >

                        <div id='topbar' className='w-full flex flex-col h-[100px] items-start justify-start z-10 ' >
                            <div className='flex flex-col items-start md:items-center fixed w-full md:w-[30.84%] border-b-2 border-b-gray-600 border-opacity-50' style={{ backdropFilter: 'blur(12px)', backgroundColor: 'rgba(0, 0, 0, 0.65)' }} >
                                
                                <div id='userInformation' className='w-full h-[53px] items-center flex gap-6 px-4 ' >
                                    <div onClick={() => navigate(`/${user.username}`)} className='transition-all hover:bg-[#181919] p-1 rounded-full cursor-pointer'>
                                        <img src={back} width='20' alt="" />
                                    </div>
                                    <div className='flex flex-col items-start justify-center' >
                                        <span className='font-bold text-xl' > {user?.name} </span>
                                        <span className='text-sm text-[#6A6F74]' > {tweets?.length} Tweet</span>
                                    </div>
                                </div>
                                
                                <div id='menu' className='flex items-start justify-start w-[85%] md:w-full h-[57px] ' >
                                    <div onClick={() => navigate(`/${user.username}/followers`)} className="w-full h-full px-4 flex items-center justify-center transition-all hover:bg-[#181818] cursor-pointer" >
                                        <span className={`h-full ${params.type == 'followers' ? activeClasses : ''} flex items-center justify-center`} >Takipçiler</span>
                                    </div>
                                    <div onClick={() => navigate(`/${user.username}/following`)} className="w-full h-full px-4 flex items-center justify-center transition-all hover:bg-[#181818] cursor-pointer" >
                                        <span className={`h-full ${params.type == 'following' ? activeClasses : ''} flex items-center justify-center`} >Takip ediliyor</span>
                                    </div>
                                </div>

                            </div>
                            <div className='h-[100px] w-full' ></div>
                        </div>

                        <div id='followButton' className='w-full flex flex-col items-center min-h-screen ' >
                            {loading ?
                                <Loading /> :
                                currentMode.map((id, index) => <FollowUser key={index} id={id} />)
                            }
                        </div>

                    </div>

                    <div id='tags' className='!w-[350px] !min-w-[350px] hidden md:flex flex-col mr-[10px] gap-4 self-start' >
                        <SearchComp />
                        <div className='w-full !h-11 mb-2' ></div>
                        <Hashtags />
                        <UsersBox title="Bunları beğenebilirsin" />
                    </div>

                </div>
            </div>
        </main >
    )
}

export default App