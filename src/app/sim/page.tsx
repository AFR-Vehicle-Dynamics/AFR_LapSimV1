'use client';
import React from 'react'
import SimControlPanel from '../components/SimComponents/SimControlPanel/SimControlPanel'
import Navbar from '../components/Navbar/Navbar'
import GraphDisplay from '../components/SimComponents/GraphDisplay/GraphDisplay';
import SimDataDisplayPanel from '../components/SimComponents/SimDataDisplayPanel/SimDataDisplayPanel';


const SimPage = () => {
  const handleVehicleSelect = (vehicle_id: number) => {
    // Handle vehicle selection if needed
    console.log('Selected vehicle:', vehicle_id);
  };

  return (
    <>
        <div className='fixed right-0 flex h-screen w-full flex-grow flex-row font-mono' data-theme="luxury">
          <Navbar/>
            <div className="flex flex-col w-1/3">
              <SimDataDisplayPanel onSelect={handleVehicleSelect}/>
              <SimControlPanel onSelect={handleVehicleSelect}/>
            </div>
            <div className="flex-grow">
              <GraphDisplay />
            </div>
        </div>
        
    </>
  )
}

export default SimPage