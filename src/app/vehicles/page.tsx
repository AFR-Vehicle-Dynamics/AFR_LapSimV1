'use client';
import React, { useState, useEffect } from 'react'
import VehicleEditSidebar from '../components/VehicleEditComponents/VehicleEditSidebar/VehicleEditSidebar'
import Navbar from '../components/Navbar/Navbar'
import CSVImporterBox from '../components/CSVImporterBox/CSVImporterBox';
import VehicleEditModal from '../components/VehicleEditModal/VehicleEditModal';

type VehicleData = Record<string, any>;

// Helper function to format field names (snake_case to Title Case)
const formatFieldName = (key: string): string => {
  return key
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Helper function to format field values
const formatFieldValue = (value: any): string => {
  if (value === null || value === undefined) {
    return 'N/A';
  }
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }
  if (typeof value === 'number') {
    return value.toString();
  }
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }
  return String(value);
};

const VehiclesPage: React.FC = () => {
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
            <VehicleEditModal isOpen={modalOpen} onClose={() => setIsModalOpen(false)} initVehicleData={vehicleData as Record<string, any> | null} />

            {selectedVehicle === -1 ? (
              <div className="flex flex-col items-center">
                <p>Add a new vehicle</p>
                <CSVImporterBox />
              </div>
            ) : selectedVehicle ? (
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-4 mb-4">
                  <p>{vehicleData?.vehicle_name || 'N/A'}</p>
                  {selectedVehicle !== -1 && (
                    <button className="btn" onClick={() => {
                      const modal = document.getElementById('edit_modal');
                      if (modal) {
                        (modal as HTMLDialogElement).showModal();
                      }
                    }}> Edit </button>
                  )}
                </div>
                <div className="overflow-auto max-h-[80vh] w-full max-w-4xl">
                  <table className="table-auto mt-4 w-full">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 sticky top-0 bg-gray-800">Attribute</th>
                        <th className="px-4 py-2 sticky top-0 bg-gray-800">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vehicleData && Object.entries(vehicleData)
                        .filter(([key]) => key !== 'id' && key != "vehicle_name")
                        .sort(([a], [b]) => {
                          // Sort: vehicle_name first, then alphabetically
                          if (a === 'vehicle_name') return -1;
                          if (b === 'vehicle_name') return 1;
                          return a.localeCompare(b);
                        })
                        .map(([key, value]) => (
                          <tr key={key}>
                            <td className="border px-4 py-2">{formatFieldName(key)}</td>
                            <td className="border px-4 py-2">{formatFieldValue(value)}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
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