import React from 'react'
import VehicleSelectSidebar from '../components/VehicleSelectSidebar/VehicleSelectSidebar'
import DataSelectSidebar from '../components/DataSelectSidebar/DataSelectSidebar'
import Navbar from '../components/Navbar/Navbar'

const SimPage = () => {
  return (
    <>
        <div className='flex h-screen flex-row font-mono' data-theme="luxury">
            <DataSelectSidebar/>
            <div className='flex-grow w-full h-full flex items-center justify-center rounded-3xl bg-gray-500'
            style={{backgroundColor: '#110e12'}}>
                <p>Select a Vehicle</p>
            </div>
            <VehicleSelectSidebar/>
        </div>
        <Navbar/>  
    </>
  )
}

export default SimPage