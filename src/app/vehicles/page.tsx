'use client';
import React, { useState, useEffect } from 'react'
import VehicleEditSidebar from '../components/VehicleEditComponents/VehicleEditSidebar/VehicleEditSidebar'
import Navbar from '../components/Navbar/Navbar'
import CSVImporterBox from '../components/CSVImporterBox/CSVImporterBox';
import VehicleEditModal from '../components/VehicleEditModal/VehicleEditModal';

interface VehicleData {
  id: number;
  vehicle_name: string;
  vehicle_type: string;
  total_mass: number;
}

const VehiclesPage: React.FC<VehicleData> = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<string | number | null>(null);
  const [modalOpen, setIsModalOpen] = useState(false);
  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);

  const handleVehicleSelect = (vehicle_id: number) => {
    setSelectedVehicle(vehicle_id);
  };

  const getVehicleData = async (vehicle_id: number) => {
    const res = await fetch(`/api/get_vehicle?vehicle_id={vehicle_id}`.replace('{vehicle_id}', vehicle_id.toString()), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    setVehicleData(data);
    console.log(vehicleData);
    return data;
  }

  useEffect(() => {
    if (typeof selectedVehicle === 'number') {
      getVehicleData(selectedVehicle).then((data) => {
        console.log(data);
      });
    }
    }, [selectedVehicle]);

  useEffect(() => {
    setSelectedVehicle(3);
  }, []);

  return (
    <>
      <div className="fixed right-0 flex h-screen w-3/4 flex-row font-mono" data-theme="luxury">
        <Navbar />
        <div
          className={`flex-grow w-full h-full flex items-center justify-center rounded-3xl`}
          style={{ backgroundColor: '#110e12' }}
        >
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          {selectedVehicle && selectedVehicle !== -1 && (
          <button className="btn" onClick={() => {
              const modal = document.getElementById('edit_modal');
              if (modal) {
                (modal as HTMLDialogElement).showModal();
              }
          }}> Edit </button>)}

            <VehicleEditModal isOpen={modalOpen} onClose={() => setIsModalOpen(false)} initVehicleData={vehicleData} />

            {selectedVehicle === -1 ? (
              <div className="flex flex-col items-center">
                <p>Add a new vehicle</p>
                <CSVImporterBox />
              </div>
            ) : selectedVehicle ? (
              <div className="flex flex-col items-center">
                <p>Selected Vehicle: {vehicleData?.vehicle_name}</p>
                <table className="table-auto mt-4">
                <thead>
                  <tr>
                  <th className="px-4 py-2">Attribute</th>
                  <th className="px-4 py-2">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                  <td className="border px-4 py-2">Name</td>
                  <td className="border px-4 py-2">{vehicleData?.vehicle_name}</td>
                  </tr>
                  <tr>
                  <td className="border px-4 py-2">Type</td>
                  <td className="border px-4 py-2">{vehicleData?.vehicle_type}</td>
                  </tr>
                  <tr>
                  <td className="border px-4 py-2">Total Mass</td>
                  <td className="border px-4 py-2">{vehicleData?.total_mass}</td>
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