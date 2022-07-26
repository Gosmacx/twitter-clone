import camera from '../assets/camera.svg'
import close from '../assets/close.svg'
import Default from '../assets/default.png'
import Defbanner from '../assets/defbanner.png'
import { useSelector, useDispatch } from 'react-redux'
import { updateUser } from '../store/user'
import { useEffect, useState } from 'react'
import axios from '../utils/axios'

function App({ setEditMode }) {

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const [banner, setBanner] = useState(null)
    const [photo, setPhoto] = useState(null)
    const [loading, setLoading] = useState(false)
    const [description, setDescription] = useState(null)
    const [name, setName] = useState(null)

    useEffect(() => {
        if (user) {
            document.getElementById("userNameInput").value = user.name
            document.getElementById("userDescriptionInput").value = user.description
            setName(user.name)
            return setDescription(user.description)
        }
    }, [user])

    const update = (d) => {
        const data = document.getElementById(`${d}Input`).files[0]
        if (data) document.getElementById(`${d}Img`).src = URL.createObjectURL(data);
    }

    const sendPhoto = () => {
        if (loading) return
        if (description.length < 3 || name.length < 3) return alert("Boş bırakamazsın.")
        setLoading(true)

        if (banner || photo) {

            const formData = new FormData();
            if (banner) formData.append("files", banner, `banner-${user.id}`);
            if (photo) formData.append("files", photo, `photo-${user.id}`);

            axios.post("/upload", formData, user.token)
                .then(response => {
                    setLoading(false)
                    dispatch(updateUser(response.data))
                })
                .catch((err) => setLoading(false));

        }

        axios.post("/update", {
            id: user.id,
            description,
            name
        }, user.token)
            .then(response => {
                if (!response.data) return;
                dispatch(updateUser(response.data))
                setDescription(response.data.description)
                setName(response.data.name)
                setLoading(false)
            })
            .catch(() => setLoading(false))



    }

    return (
        <div id="edit" className='flex absolute md:fixed right-0 top-0 items-center justify-center w-full h-full z-20 md:pl-0 bg-transparent md:bg-current border-l border-l-gray-600 border-opacity-50 md:border-none' style={{ backgroundColor: 'rgba(91, 112, 131, 0.4)' }} >
            <div className='md:min-w-[600px] md:max-w-[600px] md:min-h-[400px] md:max-h-[90vh] md:h-[650px] w-full min-h-full h-full bg-black md:rounded-3xl  overflow-y-scroll relative z-30' >
                <div className='px-4 flex items-center h-[53px] fixed bg-white w-[85%] md:max-w-max md:min-w-[600px] md:rounded-tl-3xl md:rounded-tr-3xl z-50 ' style={{ backdropFilter: 'blur(12px)', backgroundColor: 'rgba(0, 0, 0, 0.65)' }} >
                    <img onClick={() => setEditMode(false)} src={close} width="24" className='cursor-pointer' alt="" />
                    <span className='font-bold text-xl ml-10 ' >Profili Düzenle</span>
                    <button onClick={sendPhoto} className='w-20 font-semibold text-sm rounded-2xl flex items-center justify-center h-8 text-black bg-white ml-auto transition-all hover:bg-[#D7DBDC] ' >
                        {loading ?
                            <div className='w-4 h-4 border-2 border-gray-600 border-t-[#1d9bf0] animate-spin rounded-full ' ></div> :
                            <span>Kaydet</span>
                        }
                    </button>
                </div>

                <div className='h-[53px] w-full ' ></div>
                <div id='bannerSection' className='w-full h-[200px] flex items-center justify-center relative overflow-hidden bg-[#333639] ' >
                    <img id='bannerPhotoImg' src={user?.banner ?? Defbanner} className="object-cover h-full w-full" alt="" /> :
                    <div className='w-full h-full bg-black bg-opacity-10 z-10 absolute flex items-center justify-center' >
                        <img src={camera} width="30" className='cursor-pointer z-20' alt="" />
                        <input id='bannerPhotoInput'
                            onInput={e => setBanner(e.target.files[0])}
                            onChange={() => update('bannerPhoto')}
                            type="file" accept="image/jpeg,image/png,image/webp" className='opacity-0 absolute z-30 cursor-pointer ' />
                    </div>
                </div>
                <div id='profilephoto' className='relative pl-6 z-20' >
                    <div className='w-[116px] h-[116px] rounded-full border-2 border-black absolute -bottom-16 overflow-hidden flex items-center justify-center ' >
                        <img id='profilePhotoImg' src={user?.photo ?? Default} className="object-cover w-full h-full" alt="" />
                        <div className='z-10 absolute w-full h-full flex items-center justify-center bg-black bg-opacity-30' >
                            <img src={camera} width="30" className='cursor-pointer' alt="" />
                            <input id='profilePhotoInput'
                                onInput={e => setPhoto(e.target.files[0])}
                                onChange={() => update('profilePhoto')}
                                type="file"
                                accept="image/jpeg,image/png,image/webp" className='opacity-0 absolute z-20 cursor-pointer ' />
                        </div>
                    </div>
                </div>
                <div id='inputs' className='flex flex-col px-4 mt-20 gap-6' >
                    <input type="text"
                        onInput={e => setName(e.target.value)}
                        id="userNameInput"
                        className='outline-none rounded h-14 text-lg w-full bg-transparent transition-all focus-within:border-[#1d9bf0] border-2 border-gray-600 border-opacity-50 px-4'
                        placeholder='İsim' />
                    <div className='group w-full border-2 border-gray-600 border-opacity-50 rounded transition-all focus-within:border-[#1d9bf0] h-[96px] px-2 relative' >
                        <span className='text-sm text-gray-500 group-focus-within:text-[#1d9bf0] ' >Kişisel Bilgiler</span>
                        <textarea onInput={e => setDescription(e.target.value)} id="userDescriptionInput" className='w-full h-[60px] bg-transparent outline-none' cols="30" rows="10"></textarea>
                    </div>
                </div>

            </div>
            <div onClick={() => setEditMode(false)} className='w-full h-full absolute' ></div>
        </div>
    )
}

export default App