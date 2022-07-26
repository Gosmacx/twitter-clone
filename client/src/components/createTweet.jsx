import image from '../assets/image.svg'
import gif from '../assets/gif.svg'
import poll from '../assets/poll.svg'
import smile from '../assets/smile.svg'
import event from '../assets/event.svg'
import location from '../assets/location.svg'
import Default from '../assets/default.png'

import axios from '../utils/axios'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { createTweet } from '../api/requests/requests'

function App({ refresh }) {

    const [content, setContent] = useState("")
    const user = useSelector(state => state.user)

    const tweet = () => {
        if (!content || content.length < 3) return;

        let sendToData = {
            data: {
                user: user.id,
                date: Date.now(),
                content
            },
            token: user.token
        }

        const response = (data) => {
            document.getElementById("content").value = ""
            setContent("")
            if (data == 'OK') return refresh()
        }

        createTweet(sendToData, response)
    }

    let _ = content.length > 0

    const buttonStyle = {
        backgroundColor: _ ? '#1d9bf0' : '#0E4D77',
        color: _ ? '#fff' : '#7F7F7F',
        cursor: _ ? 'pointer' : 'default'
    }

    return (
        <div className='w-full flex py-1 justify-between px-4 border-b border-b-gray-500 pb-2 border-opacity-50' >
            <img src={user?.photo ? user?.photo : Default} className='rounded-full !w-[48px] !h-[48px] pt-1 mr-3 ' alt="" />
            <div className='pt-1 flex flex-col items-center w-full' >
                <input id='content' onInput={e => setContent(e.target.value)} type="text" className='w-full outline-none h-[52px] bg-transparent placeholder-gray-600 text-xl' placeholder='Neler oluyor?' />
                <div className='flex items-center justify-between w-full' >
                    <div className='flex mt-3 gap-2' >
                        <img src={image} width='25' className='cursor-pointer' />
                        <img src={gif} width='25' className='cursor-pointer' />
                        <img src={poll} width='25' className='cursor-pointer' />
                        <img src={smile} width='25' className='cursor-pointer' />
                        <img src={event} width='25' className='cursor-pointer' />
                        <img src={location} width='25' className='cursor-pointer' />
                    </div>
                    <div onClick={tweet}
                        style={buttonStyle}
                        className='w-20 h-[34px] rounded-3xl flex select-none items-center justify-center mt-3' >
                        <span className='' >Tweetle</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App