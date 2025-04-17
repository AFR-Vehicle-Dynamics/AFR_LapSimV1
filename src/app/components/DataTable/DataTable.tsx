'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import CSVImporterBox from '../CSVImporterBox/CSVImporterBox';

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
  const [selectedTrack, setSelectedTrack] = useState<string | number | null>(null);

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
      {/* <button className="btn" onClick={toggleEditable}>
        {editable ? 'View' : 'Edit'}
      </button> */}
      <div className="flex-grow w-full h-full flex items-center justify-center rounded-3xl">
        {selectedTrack === -1 ? (
            <div className="flex flex-col items-center">
              <p>Add a new track</p>
              <CSVImporterBox />
            </div>
          ) : selectedTrack ? (
            <div className="flex flex-col items-center">
              <button className="btn btn-active btn-ghost">Edit</button>
              <p>Selected Track: {trackData?.track_name}</p>
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
                <td className="border px-4 py-2">{trackData?.track_name}</td>
                </tr>
                <tr>
                <td className="border px-4 py-2">Country</td>
                <td className="border px-4 py-2">{trackData?.country}</td>
                </tr>
                <tr>
                <td className="border px-4 py-2">City</td>
                <td className="border px-4 py-2">{trackData?.city}</td>
                </tr>
              </tbody>
              </table>
            </div>
          ) : (
            <p>Select a Track</p>
          )}
      </div>
    </div>
  );
};

export default DataTable