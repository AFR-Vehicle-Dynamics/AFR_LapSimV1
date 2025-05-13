'use client';
import React, { useState, useEffect } from 'react';
import { parseAsInteger, useQueryState } from 'nuqs';

interface SimControlPanelProps {
  onSelect: (vehicle_id: number) => void;
}

const SimControlPanel: React.FC<SimControlPanelProps> = ({ onSelect }) => {
  const [vehicles, setVehicles] = useState<{ id: number, vehicle_name: string }[]>([]);
  const [vehicle, setVehicle] = useQueryState('vehicle', parseAsInteger);
  const [tracks, setTracks] = useState<{ id: number, track_name: string}[]>([]);
  const [track, setTrack] = useQueryState('track', parseAsInteger);

  const handleVehicleSelect = (vehicle_id: number) => {
    setVehicle(vehicle_id);
    console.log(vehicle);
  };

  const handleTrackSelect = (track_id: number) => {
    setTrack(track_id);
    console.log(track);
  };

  const getAllVehicleData = async () => {
    const res = await fetch('/api/get_all_vehicles', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    setVehicles(data);
    console.log(vehicles);
    return data;
  };

  const getAllTrackData = async () => {
    const res = await fetch('/api/get_all_tracks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    setTracks(data);
    console.log(tracks);
    return data;
  };

  useEffect(() => {
    getAllVehicleData().then((v_data) => {
      console.log("vehicle data: ", v_data);
    });

    getAllTrackData().then((t_data) => {
      console.log("track data: ", t_data);
    });
  }, []);

  return (
    <div className="flex" data-theme="luxury">
      {/* Sidebar */}
      <div
        // state to control width and visibility
        className="fixed h-2/3 transition-all duration-300 z-9 ml-32 mt-3 w-72 bottom-8 left-0 font-mono pt-5 bg-[#20171e] rounded-xl" data-theme="luxury">
        {/* Sidebar content */}

        <div className="flex flex-col items-center">
            <div className="flex flex-col items-center">
                <div className="mt-4">
                <h1>CONTROL PANEL</h1>
            </div>
            <div className="dropdown dropdown-right">
                <div tabIndex={0} role="button" className="btn btn-outline mt-4 w-64 m-1">{vehicle ? vehicles.find(v => v.id === vehicle)?.vehicle_name : "Select Vehicle"}</div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                {vehicles.map((vehicle, index) => (
                <div key={index} className="mt-4 text-center">
                  <button
                  className="btn font-mono btn-outline hover:text-blue-500 w-64"
                  onClick={() => handleVehicleSelect(vehicle.id)}
                  >
                  {vehicle.vehicle_name}
                  </button>
                </div>
                ))}
              </ul>
            </div>
            <div className="dropdown dropdown-right">
                <div tabIndex={0} role="button" className="btn btn-outline mt-4 w-64 m-1">{track ? tracks.find(t => t.id === track)?.track_name : "Select Track"}</div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                {tracks.map((track, index) => (
                <div key={index} className="mt-4 text-center">
                  <button
                  className="btn font-mono btn-outline hover:text-blue-500 w-64"
                  onClick={() => handleTrackSelect(track.id)}
                  >
                  {track.track_name}
                  </button>
                </div>
                ))}
              </ul>
            </div>
        </div>
      </div>
      {/* Main content */}
      <div className={`flex-1 p-4 ml-64`}>
      </div>
    </div>
  </div>
  );
};

export default SimControlPanel