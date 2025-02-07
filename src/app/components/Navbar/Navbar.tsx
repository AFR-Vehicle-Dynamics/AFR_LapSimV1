import React from 'react';
import Link from 'next/link';
import { GiRaceCar } from "react-icons/gi";
import { MdMenu } from "react-icons/md";
import { IoMdHome, IoIosSpeedometer } from "react-icons/io";
import { FaRoad } from "react-icons/fa";
import Image from 'next/image';
import AFRLogo from '../../assets/afrlogo.png';

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 h-full z-20 flex flex-col items-center bg-transparent w-1/12 mt-6" data-theme="luxury">
      <ul className="flex flex-col items-center gap-9 p-5">
      <li className="tooltip tooltip-right overflow-visible pb-5" data-tip="Home"><Link href="/"><Image src={AFRLogo} alt="AFR Logo" width={38} height={38} className="w-8 h-8"/></Link></li>
      <li className="tooltip tooltip-right overflow-visible" data-tip="Vehicles"><Link href="/vehicles"><GiRaceCar className="w-9 h-9"/></Link></li>
      <li className="tooltip tooltip-right overflow-visible" data-tip="Tracks"><Link href="/tracks"><FaRoad className="w-7 h-7"/></Link></li>
      <li className="tooltip tooltip-right overflow-visible" data-tip="Simulator"><Link href="/sim"><IoIosSpeedometer className="w-8 h-8"/></Link></li>
      </ul>
    </div>
  )
}

export default Navbar