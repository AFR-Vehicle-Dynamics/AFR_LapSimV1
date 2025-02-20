'use client';
import React from 'react'
import { useState, useEffect } from 'react';

interface TrackEditSidebarProps {
  onSelect: (track_id: number) => void;
}

const TrackEditSidebar: React.FC<TrackEditSidebarProps> = ({ onSelect }) => {
  const [tracks, setTracks] = useState<{ id: number, track_name: string }[]>([]);

  const handleSelect = (track_id: number) => {
    onSelect(track_id);
  };

  const getAllTrackData = async () => {
    const res = await fetch(`http://localhost:3000/api/get_all_tracks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    setTracks(data);
    console.log(tracks);
    return data;
  }
  
  useEffect(() => {
    getAllTrackData().then((data) => {
      console.log(data);
    });
  }, []);

  return (
    <div className="flex" data-theme="luxury">
      {/* Sidebar */}
      <div
        // state to control width and visibility
        className={`fixed h-[calc(100vh-2rem)] transition-all duration-300 z-10 mr-3 ml-32 mt-3 mb-3 w-auto left-0 font-mono pt-5 bg-[#20171e] rounded-xl`}>
        {/* Sidebar content */}
        <div className="flex flex-col items-center">
            <div className="flex flex-col items-center">
                <div className="mt-4">
                <h1>TRACK SELECT</h1>
            </div>
            {tracks.map((track, index) => (
              <div key={index} className="mt-4 text-center">
                <button
                  className="btn font-mono btn-outline hover:text-blue-500 w-64"
                  onClick={() => handleSelect(track.id)}
                >
                  {track.track_name}
                </button>
              </div>
            ))}
            <div key={'+'} className="mt-4 text-center">
              <button
                className="btn font-mono btn-outline hover:text-blue-500 w-64"
                onClick={() => handleSelect(-1)}
              >
                +
              </button>
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

export default TrackEditSidebar