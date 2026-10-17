import React from 'react'
import Button from '@mui/material/Button'
import { RiMenu2Fill} from 'react-icons/ri';
import {LiaAngleDownSolid} from "react-icons/lia"

const Navigation = () => {
  return (
    <nav className='py-2'>
      <div className='container flex items-center justify-end'>
        <div className='col_1 w-[20%]'>
            <Button className='!text-black gap-2 w-full'><RiMenu2Fill className='tex-[18px]'/> Shop By Categories
            <LiaAngleDownSolid className='text-[13px] ml-auto font-bold'/>
            </Button>
        </div>
        <div className='col_2 w-[80%]'>
            
        </div>
      </div>
    </nav>
  )
}

export default Navigation
