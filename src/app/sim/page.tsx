'use client';
import React, { useState, useEffect } from 'react'
import SimControlPanel from '../components/SimComponents/SimControlPanel/SimControlPanel'
import Navbar from '../components/Navbar/Navbar'
import GraphDisplay from '../components/SimComponents/GraphDisplay/GraphDisplay';
import SimDataDisplayPanel from '../components/SimComponents/SimDataDisplayPanel/SimDataDisplayPanel';


const runOpenVehicle = async (a: string, b: string) => {
  const res = await fetch(`http://localhost:3000/api/matlab?a=${a}&b=${b}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return data;
}

const SimPage = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<string | number | null>(null);
  const [testNum, setTestNum] = useState<string | number | null>(0);
  const handleVehicleSelect = (vehicle_id: number) => {
    setSelectedVehicle(vehicle_id);
  };


  // update testnum fetch
  useEffect(() => { 
    const fetchTestNum = async () => {
      try {
        const result = await runOpenVehicle("1", "2");
        setTestNum(result);
      } catch (error) {
        console.error("Failed to fetch test number:", error);
      }
    };
  }, []);

  return (
    <>
        <div className='fixed right-0 flex h-screen w-full flex-grow flex-row font-mono' data-theme="luxury">
          <Navbar/>
            <div className="flex flex-col w-1/3">
              <SimDataDisplayPanel onSelect={handleVehicleSelect}/>
              <SimControlPanel onSelect={handleVehicleSelect}/>
              <p>MEOWEM {testNum}</p>
            </div>
            <div className="flex-grow">
              <GraphDisplay/>
            </div>
        </div>
        
    </>
  )
}

export default SimPage