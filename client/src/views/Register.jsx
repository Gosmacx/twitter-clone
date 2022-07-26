import Dropdown from '../assets/dropdown.svg'
import axios from '../utils/axios'
import CryptoJS from 'crypto-js'
import { useState } from 'react'
import { login } from '../store/user'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { registerUser } from '../api/requests/requests'

function App() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [username, setUsername] = useState(null)
    const [name, setName] = useState(null)
    const [password, setPassword] = useState(null)
    const [mail, setMail] = useState(null)
    const [loading, setLoading] = useState(false)


    const createAccount = () => {
        if (!username || !name || !password || !mail || loading) return;
        const cryptedPassword = CryptoJS.AES.encrypt(password, import.meta.env.VITE_SECRET_KEY).toString()
        
        let sendToData = {
            password: cryptedPassword,
            username,
            name,
            mail
        }

        const response = (data) => {
            if (!data || !data?.username) return;
            dispatch(login(data))
            navigate("/home")
        }

        registerUser(sendToData, response, setLoading)

    }

    return (
        <div className='w-full h-screen flex items-center justify-center' >

            <div className='w-[300px] flex flex-col items-center justify-center gap-6' >
                <span className='text-3xl font-bold' >Hesabımı oluştur</span>
                <input type="text"
                    onInput={e => setName(e.target.value)}
                    className='outline-none rounded h-14 text-lg w-full bg-transparent transition-all focus-within:border-[#1d9bf0] border-2 border-gray-600 border-opacity-50 px-4'
                    placeholder='İsmin' />
                <input type="text"
                    onInput={e => setUsername(e.target.value)}
                    className='outline-none rounded h-14 text-lg w-full bg-transparent transition-all focus-within:border-[#1d9bf0] border-2 border-gray-600 border-opacity-50 px-4'
                    placeholder='Kullanıcı Adı' />
                <input type="text"
                    onInput={e => setMail(e.target.value)}
                    className='outline-none rounded h-14 text-lg w-full bg-transparent transition-all focus-within:border-[#1d9bf0] border-2 border-gray-600 border-opacity-50 px-4'
                    placeholder='E-posta' />
                <input type="Password"
                    onInput={e => setPassword(e.target.value)}
                    className='outline-none rounded h-14 text-lg w-full bg-transparent transition-all focus-within:border-[#1d9bf0] border-2 border-gray-600 border-opacity-50 px-4'
                    placeholder='Şifre' />
                <div className="my-4 flex items-start justify-center flex-col w-full" >
                    <span className="font-bold mb-2" >Şifre Hakkında</span>
                    <span className="text-sm text-[#71767B] " >Bu uygulama bir demodur. Lütfen başka platformlarda kullandığınız şifrenizi girmeyiniz.</span>
                </div>

                <div className="flex w-full gap-3 items-center justify-start" >

                    <div className="flex flex-col items-start justify-center !w-32 min-w-[7rem] h-14 bg-black px-1 relative border-2 border-gray-600 border-opacity-50 rounded transition-all focus-within:border-[#1d9bf0] group">
                        <span className="text-[#71767B] text-sm px-2 group-focus-within:text-[#1d9bf0] " >Ay</span>
                        <select className="bg-transparent outline-none appearance-none text-xl w-full h-full cursor-pointer pl-1 z-10">
                            <option className="bg-black w-full" ></option>
                            <option value="Ocak" className="bg-black w-full" >Ocak</option>
                            <option value="Şubat" className="bg-black w-full" >Şubat</option>
                            <option value="Mart" className="bg-black w-full" >Mart</option>
                            <option value="Nisan" className="bg-black w-full" >Nisan</option>
                            <option value="Mayıs" className="bg-black w-full" >Mayıs</option>
                            <option value="Haziran" className="bg-black w-full" >Haziran</option>
                            <option value="Temmuz" className="bg-black w-full" >Temmuz</option>
                            <option value="Ağustos" className="bg-black w-full" >Ağustos</option>
                            <option value="Eylül" className="bg-black w-full" >Eylül</option>
                            <option value="Ekim" className="bg-black w-full" >Ekim</option>
                            <option value="Kasım" className="bg-black w-full" >Kasım</option>
                            <option value="Aralaık" className="bg-black w-full" >Aralık</option>
                        </select>
                        <img src={Dropdown} width="30" className='absolute right-[0.25rem] ' alt="" />
                    </div>

                    <div className="flex flex-col items-start justify-center w-full h-14 bg-black px-1 relative border-2 border-gray-600 border-opacity-50 rounded transition-all focus-within:border-[#1d9bf0] group">
                        <span className="text-[#71767B] text-sm px-2 group-focus-within:text-[#1d9bf0] " >Gün</span>
                        <select className="bg-transparent outline-none appearance-none text-xl w-full h-full cursor-pointer pl-1 z-10">
                            <option className="bg-black w-full" ></option>
                            {Array.from(Array(32).keys()).map(item => {
                                return (
                                    <option key={item} value={item} className="bg-black w-full" > {item} </option>
                                )
                            })}
                        </select>
                        <img src={Dropdown} width="30" className='absolute right-[0.25rem] ' alt="" />
                    </div>

                    <div className="flex flex-col items-start justify-center w-full h-14 bg-black px-1 relative border-2 border-gray-600 border-opacity-50 rounded transition-all focus-within:border-[#1d9bf0] group">
                        <span className="text-[#71767B] text-sm px-2 group-focus-within:text-[#1d9bf0] " >Yıl</span>
                        <select className="bg-transparent outline-none appearance-none text-xl w-full h-full cursor-pointer pl-1 z-10">
                            <option className="bg-black w-full" ></option>
                            {["M.Ö 415"].map(item => {
                                return (
                                    <option key={item} value={item} className="bg-black w-full" > {item} </option>
                                )
                            })}
                        </select>
                        <img src={Dropdown} width="30" className='absolute right-[0.25rem] ' alt="" />
                    </div>

                </div>



                <button onClick={createAccount} className='w-full h-10 flex items-center justify-center gap-4 bg-white text-black rounded-3xl transition-all hover:bg-[#E6E6E6] ' >
                    {loading ?
                        <div className='w-5 h-5 border-2 border-gray-600 animate-spin rounded-full border-t-[#1d9bf0]' ></div> :
                        <span>İleri</span>
                    }
                </button>
            </div>

        </div>
    )
}

export default App