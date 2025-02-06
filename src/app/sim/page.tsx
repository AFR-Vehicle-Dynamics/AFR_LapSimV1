'use client';
import React, { useState } from 'react'
import VehicleSelectSidebar from '../components/SimControlPanel/SimControlPanel'
import DataSelectSidebar from '../components/DataSelectSidebar/DataSelectSidebar'
import Navbar from '../components/Navbar/Navbar'

const SimPage = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<string | number | null>(null);
  const handleVehicleSelect = (vehicle_id: number) => {
    setSelectedVehicle(vehicle_id);
  };

  return (
    <>
        <div className='fixed right-0 flex h-screen w-3/4 flex-row font-mono' data-theme="luxury">
            {/* <DataSelectSidebar/> */}
            <div className='w-full h-full flex items-center justify-center rounded-3xl bg-gray-500'
            style={{backgroundColor: '#110e12'}}>
                <p>Configure control panel</p>
            </div>
            <VehicleSelectSidebar onSelect={handleVehicleSelect}/>
            <Navbar/>
        </div>
        
    </>
  )
}

export default SimPage