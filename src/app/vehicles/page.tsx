'use client';
import React, { useState } from 'react'
import VehicleEditSidebar from '../components/VehicleEditSidebar/VehicleEditSidebar'
import Navbar from '../components/Navbar/Navbar'
import CSVImporterBox from '../components/CSVImporterBox/CSVImporterBox';

const VehiclesPage = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

  const handleVehicleSelect = (vehicle: string) => {
    setSelectedVehicle(vehicle);
  };

  return (
    <>
      <Navbar />
      <div className="flex h-screen flex-row font-mono" data-theme="luxury">
        <div
          className={`flex-grow w-full h-full flex items-center justify-center rounded-3xl`}
          style={{ backgroundColor: '#110e12' }}
        >
            {selectedVehicle === '+' ? (
            <div className="flex flex-col items-center">
              <p>Add a new vehicle</p>
              <CSVImporterBox />
              {/* Add your form or content for adding a new vehicle here */}
            </div>
            ) : selectedVehicle ? (
            <div className="flex flex-col items-center">
              <p>Selected Vehicle: {selectedVehicle}</p>
              <div className="join">
              <input
                className="join-item btn btn-square w-auto px-4"
                type="radio"
                name="options"
                aria-label="General"
                defaultChecked
              />
              <input
                className="join-item btn btn-square w-auto px-4"
                type="radio"
                name="options"
                aria-label="Inertia"
              />
              <input
                className="join-item btn btn-square w-auto px-4"
                type="radio"
                name="options"
                aria-label="Dimensions"
              />
              <input
                className="join-item btn btn-square w-auto px-4"
                type="radio"
                name="options"
                aria-label="Steering"
              />
              <input
                className="join-item btn btn-square w-auto px-4"
                type="radio"
                name="options"
                aria-label="Aerodynamics"
              />
              <input
                className="join-item btn btn-square w-auto px-4"
                type="radio"
                name="options"
                aria-label="Brakes"
              />
              <input
                className="join-item btn btn-square w-auto px-4"
                type="radio"
                name="options"
                aria-label="Tyres"
              />
              <input
                className="join-item btn btn-square w-auto px-4"
                type="radio"
                name="options"
                aria-label="Engine"
              />
              <input
                className="join-item btn btn-square w-auto px-4"
                type="radio"
                name="options"
                aria-label="Transmission"
              />
              </div>
              <table className="table-auto mt-4">
              <thead>
                <tr>
                <th className="px-4 py-2">Attribute</th>
                <th className="px-4 py-2">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                <td className="border px-4 py-2">Attribute 1</td>
                <td className="border px-4 py-2">Value 1</td>
                </tr>
                <tr>
                <td className="border px-4 py-2">Attribute 2</td>
                <td className="border px-4 py-2">Value 2</td>
                </tr>
                <tr>
                <td className="border px-4 py-2">Attribute 3</td>
                <td className="border px-4 py-2">Value 3</td>
                </tr>
              </tbody>
              </table>
            </div>
            ) : (
            <p>Select a Vehicle</p>
            )}
        </div>
        <VehicleEditSidebar onSelect={handleVehicleSelect} />
      </div>
    </>
  );
};

export default VehiclesPage