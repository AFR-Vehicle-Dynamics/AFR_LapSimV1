'use client';
import React from 'react'
import { useState } from 'react';

const VehicleSelectSidebar = () => {
  return (
    <div className="flex" data-theme="luxury">
      {/* Sidebar */}
      <div
        // state to control width and visibility
        className={`fixed h-screen transition-all mr-3 ml-3 duration-300 z-10 w-64 left-0 pt-5`}>
        {/* Sidebar content */}
        <div className="flex flex-col w-full items-center">
          <div className="mt-4 h-30 text-center">
            <h1>DATA SELECT</h1>
          </div>
          <div className="mt-4 text-center">
            <button onClick={() => (window.location.href = '/sim#')} className="font-mono btn btn-outline hover:text-blue-500 w-64"
              >
              DRAG
            </button>
          </div>
          <div className="mt-4 text-center">
            <button onClick={() => (window.location.href = '/sim#')} className="font-mono btn btn-outline hover:text-blue-500 w-64">
              TRACK
            </button>
          </div>
          <div className="mt-4 text-center">
            <button onClick={() => (window.location.href = '/sim#')} className="font-mono btn btn-outline hover:text-blue-500 w-64">
              VEHICLE
            </button>
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

export default VehicleSelectSidebar