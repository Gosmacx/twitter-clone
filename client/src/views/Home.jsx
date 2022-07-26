import shine from '../assets/shine.svg'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Hashtags from '../components/suggestions/Hashtags'
import SearchComp from '../components/suggestions/Search'
import UsersBox from '../components/suggestions/UsersBox'
import Tweet from '../components/Tweet'
import CreateTweet from '../components/createTweet'
import Loading from '../components/Loading'

import { useSelector } from 'react-redux'
import { getHome } from '../api/requests/requests'

function App() {


  const user = useSelector(state => state.user)
  const [tweets, setTweets] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const refresh = () => {
    getHome(setTweets, setLoading)
  }

  useEffect(() => {
    if (!user.token) return navigate("/login")
    refresh()
  }, [user])

  if (!user.token) return;


  return (
    <main className='w-full flex items-start' >
      <div className='min-w-full md:w-[990px] md:min-w-max relative' >
        <div className='w-full flex items-end justify-end gap-10' >

          <div id='tweets' className='border-l md:w-[592px] w-full border-l-gray-500 border-r border-r-gray-500 border-opacity-50 self-start flex flex-col items-center' >

            <div id='topbar' className='w-full relative h-[53px] flex items-center justify-center z-30' >
              <div className='flex items-center justify-between h-[53px] fixed w-[85%] md:w-[31%] px-4' style={{ backdropFilter: 'blur(12px)', backgroundColor: 'rgba(0, 0, 0, 0.65)' }} >
                <span className='font-bold text-xl' >Anasayfa</span>
                <img src={shine} width="30" alt="" />
              </div>
            </div>

            <CreateTweet refresh={refresh} />

            <div className='w-full flex flex-col min-h-screen' >
              {loading ?
                <Loading /> :
                tweets.map((tweet, index) => {
                  return (
                    <Tweet key={index} id={tweet.user} content={tweet.content} date={tweet.date} />
                  )
                })
              }
            </div>

          </div>

          <div id='tags' className='!w-[350px] !min-w-[350px] hidden md:flex flex-col mr-[10px] gap-4 self-start' >
            <SearchComp />
            <div className='w-full !h-11 mb-2' ></div>
            <Hashtags />
            <UsersBox title="Kimi takip etmeli" />
          </div>

        </div>
      </div>
    </main >
  )
}

export default App
