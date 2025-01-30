'use client';
import React from 'react'
import { useState } from 'react';
import VehicleModal from '../VehicleModal/VehicleModal';

interface VehicleEditSidebarProps {
  onSelect: (vehicle: string) => void;
}

const VehicleEditSidebar: React.FC<VehicleEditSidebarProps> = ({ onSelect }) => {
  const handleSelect = (vehicle: string) => {
    onSelect(vehicle);
  };
  return (
    <div className="flex" data-theme="luxury">
      {/* Sidebar */}
      <div
        // state to control width and visibility
        className={`fixed h-screen transition-all 
                    duration-300 z-10 mr-3 ml-3 w-64 right-0 font-mono pt-5`}>
        {/* Sidebar content */}
        
        <div className="flex flex-col items-center">
            <div className="flex flex-col items-center">
                <div className="mt-4">
                <h1>VEHICLE SELECT</h1>
            </div>
        </div>
        <div className="mt-4 text-center">
            <button className="btn font-mono btn-outline hover:text-blue-500 w-64" onClick={() => handleSelect("JINX")}>JINX</button>
          </div>
          <div className="mt-4 text-center">
            <button className="btn font-mono btn-outline hover:text-blue-500 w-64" onClick={() => handleSelect("GASTLY")}>GASTLY</button>
          </div>
          <div className="mt-4 text-center">
            <button className="btn font-mono btn-outline hover:text-blue-500 w-64" onClick={() => handleSelect("+")}>+</button>
          </div>
          {/* Add more sidebar items here */}
        </div>
      </div>
      {/* Main content */}
      <div className={`flex-1 p-4 ml-64`}>
      </div>
    </div>
  );
};

export default VehicleEditSidebar