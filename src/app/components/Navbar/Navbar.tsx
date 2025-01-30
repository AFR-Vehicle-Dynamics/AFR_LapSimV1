import React from 'react';
import Link from 'next/link';
import { GiRaceCar } from "react-icons/gi";
import { MdMenu } from "react-icons/md";
import { IoMdHome, IoIosSpeedometer } from "react-icons/io";

const Navbar = () => {
  return (
    <div className="absolute bottom-8 z-20 left-6 dropdown dropdown-top items-center justify-center bg-transparent" data-theme="luxury">
        <div tabIndex={0} role="button" className="btn m-1 h-15 bg-transparent bg-yellow-500 text-black hover:bg-yellow-700"><MdMenu className="w-7 h-7"/></div>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow items-center">
            <li className="tooltip tooltip-right" data-tip="Home"><Link href="/"><IoMdHome className="w-6 h-6"/></Link></li>
            <li className="tooltip tooltip-right" data-tip="Vehicles"><Link href="/vehicles"><GiRaceCar className="w-8 h-8"/></Link></li>
            <li className="tooltip tooltip-right" data-tip="Simulator"><Link href="/sim"><IoIosSpeedometer className="w-7 h-7"/></Link></li>
        </ul>
    </div>
  )
}

export default Navbar