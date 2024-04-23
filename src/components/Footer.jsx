// import React from 'react'

const Footer = () => {
  return (
    <div className='flex flex-col justify-center items-center bg-slate-800
        text-white py-2 min-h-7'>
        <div className='logo font-bold text-2xl'>
            <span className='text-blue-500'>&lt;</span>
            Pass
            <span className='text-blue-500'>OP/&gt;</span>
        </div>
        <div className='flex justify-center items-center gap-2'>
            Created with <img className='w-5' src='icons/heart.png' alt='Heart'/> by RashidZiya
        </div>
    </div>
  )
}

export default Footer