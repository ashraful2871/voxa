import Image from 'next/image'
import React from 'react'
import user from '@/assets/dashboard/user.png'
import { IoBagOutline, IoBagSharp, IoCalendarClearOutline } from 'react-icons/io5'
import { FaCircleCheck, FaHashtag } from "react-icons/fa6";
import { MdOutlineCheckCircleOutline, MdOutlineLocationOn, MdOutlinePhone, MdOutlineWatchLater } from 'react-icons/md';
import { FiMail } from "react-icons/fi";
import { PiGenderMaleBold } from "react-icons/pi";
import { IoMdFemale } from 'react-icons/io';
import user1 from '@/assets/dashboard/Rectangle 54.png'
import user2 from '@/assets/dashboard/Rectangle 55.png'
import user3 from '@/assets/dashboard/Rectangle 56.png'
import user4 from '@/assets/dashboard/Rectangle 57.png'
import { BiMessageError } from "react-icons/bi";
import { GrStatusWarning } from "react-icons/gr";
import { Button } from '@/components/ui/button';

export default function UserSidebar() {
  return (
    <div className="flex justify-end">
      <div className='h-[850px] bg-foreground absolute mx-5 w-64 p-3 z-10 mt-20 rounded-lg'>

        <Image src={user} alt='' height={80} width={80} />

        <div className="flex justify-between items-center mt-3">
          <h2 className='text-xl font-bold text-white'>Luther Logan</h2>
          <div className="flex gap-2">
            <FaCircleCheck className='text-lg text-white' />
            <IoBagSharp className='text-lg text-white' />
          </div>
        </div>
        <p className='text-sm font-me text-secondary border-b border-secondary pb-3'><span className='text-warning'>VOXA Gold</span>- End in 26 Oct,2025</p>
        <div className='pt-2 border-b pb-3 border-secondary'>
          <div className="flex gap-2 my-1 items-center text-secondary">
            <MdOutlineLocationOn className='text-2xl' />
            <p className='text-secondary font-medium text-sm'>Berlin, Germany</p>
          </div>
          <div className="flex gap-2 my-1 items-center text-secondary">
            <FaHashtag className='text-xl' />
            <p className='text-secondary font-medium text-sm'>User ID: 10294</p>
          </div>
          <div className="flex gap-2 my-1 items-center text-secondary">
            <IoCalendarClearOutline className='text-xl' />
            <p className='text-secondary font-medium text-sm'>Age: 24</p>
          </div>
          <div className="flex gap-2 my-1 items-center text-secondary">
            <MdOutlineWatchLater className='text-xl' />
            <p className='text-secondary font-medium text-sm'>22 Oct, 2020</p>
          </div>
          <div className="flex gap-2 my-1 items-center text-secondary">
            <MdOutlinePhone className='text-xl' />
            <p className='text-secondary font-medium text-sm'>Phone: +8823-(854)456</p>
          </div>
          <div className="flex gap-2 my-1 items-center text-secondary">
            <FiMail className='text-xl' />
            <p className='text-secondary font-medium text-sm'>Email: mark@email.com</p>
          </div>
          <div className="flex gap-2 my-1 items-center text-secondary">
            <PiGenderMaleBold className='text-xl' />
            <p className='text-secondary font-medium text-sm'>Gender: Male</p>
          </div>
          <div className="flex gap-2 my-1 items-center text-secondary">
            <IoMdFemale className='text-2xl' />
            <p className='text-secondary font-medium text-sm'>Interested In: Women</p>
          </div>
        </div>

        <div className="pt-3">
          <div className="flex justify-between">
            <div className="flex text-secondary gap-1 items-center">
              <MdOutlineCheckCircleOutline className='text-xl' />
              <p className='text-sm font-medium'>ID Verified: Yes</p>
            </div>
            <p className='text-sm font-bold cursor-pointer text-primary underline'>Download Doc</p>
          </div>

        </div>
        <div className="flex items-center border-b border-secondary  pb-3 gap-1 text-secondary text-sm ">
          <IoBagOutline className='text-xl' />
          <p>Income Verified: No</p>
        </div>
        <div className="pt-3">
          <p className='text-secondary text-sm'>Profile Photos: (4 uploaded)</p>
          <div className="grid grid-cols-4 gap-2 mt-2">
            <Image src={user1} height={54} width={54} alt='' />
            <Image src={user2} height={54} width={54} alt='' />
            <Image src={user3} height={54} width={54} alt='' />
            <Image src={user4} height={54} width={54} alt='' />
          </div>
        </div>
        <div className='py-3 border-b border-secondary pb-3'>
          <h3 className='text-secondary text-sm font-bold'>Bio:</h3>
          <p className='font-medium text-secondary text-sm'>Trust me, I m a billionaire, in Dogecoin XD! #aquarius</p>
        </div>
        <div className="pt-3">
          <h3 className='text-sm text-secondary font-bold'>User Flag History</h3>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1 text-sm text-secondary">
                <BiMessageError className='text-xl' />
                <p>Voice Note Flagged: 6</p>
              </div>
              <div className="flex items-center gap-1 text-sm text-secondary">
                <GrStatusWarning className='text-xl' />
                <p>Prior Warnings: 2</p>
              </div>
            </div>

            <div className="text-secondary text-center text-sm">
              {/* <p>Flag rate</p>
            <h2 className='text-base font-bold'>71%</h2> */}
            </div>
          </div>
        </div>
        <Button variant={'outline'} className='border !border-secondary mt-3 !text-white font-bold'>View in Voice Moderation</Button>
      </div>
    </div>
  )
}
