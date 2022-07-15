function App() {
    return (
        <div className='bg-black flex items-center fixed justify-center py-1' >
            <div className='group focus-within:border w-[350px] focus-within:border-[#1d9bf0] bg-[#202327] flex items-center pl-3 !h-11 !min-h-[2.75rem] rounded-3xl mt-1 transition-all border border-transparent' >
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" className='fill-gray-600 group-focus-within:fill-[#1d9bf0] transition-all' ><path d="m19.6 21-6.3-6.3q-.75.6-1.725.95Q10.6 16 9.5 16q-2.725 0-4.612-1.887Q3 12.225 3 9.5q0-2.725 1.888-4.613Q6.775 3 9.5 3t4.613 1.887Q16 6.775 16 9.5q0 1.1-.35 2.075-.35.975-.95 1.725l6.3 6.3ZM9.5 14q1.875 0 3.188-1.312Q14 11.375 14 9.5q0-1.875-1.312-3.188Q11.375 5 9.5 5 7.625 5 6.312 6.312 5 7.625 5 9.5q0 1.875 1.312 3.188Q7.625 14 9.5 14Z" /></svg>
                <input className='ml-3 transition-all placeholder-gray-600 outline-none bg-transparent w-full' placeholder="Twitter'da Ara" type="text" />
            </div>
        </div>
    )

}

export default App