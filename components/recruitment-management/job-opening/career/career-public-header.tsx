import React from 'react'
import SMILAXLOGO from '@/public/smilax-logo.svg';
import Image from 'next/image';

export const CareerPublicHeader = () => {
  return (
    <div className='flex items-center mb-[23px] justify-between'>
        <Image className='w-[202px]' alt='smilax' src={SMILAXLOGO}/>

        <ul className='flex gap-3 text-[#065258] font-bold text-[14px] items-center justify-center'>
            <li>Services</li>
            <li>We are Smilax</li>
            <li>News and Events</li>
            <li>Career</li>
            <li>Contact Us</li>


        </ul>
    </div>
  )
}
