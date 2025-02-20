'use client';
import React from 'react'
import { useState, useEffect } from 'react';

interface VehicleEditSidebarProps {
  onSelect: (vehicle_id: number) => void;
}

const VehicleEditSidebar: React.FC<VehicleEditSidebarProps> = ({ onSelect }) => {
  const [vehicles, setVehicles] = useState<{ id: number, vehicle_name: string }[]>([]);

  const handleSelect = (vehicle_id: number) => {
    onSelect(vehicle_id);
  };

  const getAllVehicleData = async () => {
    const res = await fetch(`http://localhost:3000/api/get_all_vehicles`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    setVehicles(data);
    console.log(vehicles);
    return data;
  }
  
  useEffect(() => {
    getAllVehicleData().then((data) => {
      console.log(data);
    });
  }, []);

  return (
    <div className="flex" data-theme="luxury">
      {/* Sidebar */}
      <div
        // state to control width and visibility
        className={`fixed h-[calc(100vh-3rem)] transition-all duration-300 z-10 mr-3 ml-32 mt-3 mb-3 w-auto left-0 font-mono pt-5 bg-gray-600 rounded-xl`}>
        {/* Sidebar content */}
        <div className="flex flex-col items-center">
            <div className="flex flex-col items-center">
                <div className="mt-4">
                <h1>VEHICLE SELECT</h1>
            </div>
            {vehicles.map((vehicle, index) => (
            <div key={index} className="mt-4 text-center">
              <button
                className="btn font-mono btn-outline hover:text-blue-500 w-64"
                onClick={() => handleSelect(vehicle.id)}
              >
                {vehicle.vehicle_name}
              </button>
            </div>
          ))}
        </div>
          
      </div>
      {/* Main content */}
      <div className={`flex-1 p-4 ml-64`}>
      </div>
    </div>
  </div>
  );
};

export default VehicleEditSidebar