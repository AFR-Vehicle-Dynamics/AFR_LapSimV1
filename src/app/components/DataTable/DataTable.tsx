'use client';
import React, { useState } from 'react';

interface TracksData {
  track_name: string;
  track_id: number;
  country: string;
  city: string;
}

interface VehicleData {
  vehicle_name: string;
  vehicle_type: string;
  total_mass: number;
}

const DataTable = ({ objects }: { objects: any[] }) => {
  const [editable, setEditable] = React.useState(false);
  const [trackData, setTrackData] = useState<TracksData | null>(null);
  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);

  const toggleEditable = () => {
    setEditable(!editable);
  };

  const editTrackData = async (track_id: number) => {
    const res = await fetch(`http://localhost:3000/api/edit_track?track_id=${track_id}`, {
      method: 'PUT',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(trackData),
    });
    const data = await res.json();
    setTrackData(data);
    console.log(trackData);
    return data;
  }

  const editVehicleData = async (vehicle_id: number) => {
    const res = await fetch(`http://localhost:3000/api/edit_vehicle?vehicle_id=${vehicle_id}`, {
      method: 'PUT',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(trackData),
    });
    const data = await res.json();
    setVehicleData(data);
    console.log(vehicleData);
    return data;
  }

  return (
    <div>
      <button className="btn" onClick={toggleEditable}>
        {editable ? 'View' : 'Edit'}
      </button>
      <div className="overflow-x-auto w-64 h-11 bg-sky-50">
        {objects.map((row, rowIndex) => (
            <div key={rowIndex} className="flex">
            console.log(Object.values(row));
            {Object.values(row).map((value, colIndex) => (
              <div key={colIndex} className="p-2 border">
              {editable ? (
                <input className="input input-bordered" defaultValue={value as string} />
              ) : (
                value as React.ReactNode
              )}
              </div>
            ))}
            </div>
        ))}
      </div>
    </div>
  );
};

export default DataTable