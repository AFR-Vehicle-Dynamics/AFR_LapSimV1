'use client';
import React, { useState, useEffect } from 'react';

interface SimDataDisplayPanelProps {
  onSelect: (vehicle_id: number) => void;
}

const openModal = (id: string) => {
    const modal = document.getElementById(id) as HTMLDialogElement;
    console.log("clicked me");
    modal?.showModal();
};

const SimDataDisplayPanel: React.FC<SimDataDisplayPanelProps> = ({ onSelect }) => {
    const [time, setTime] = useState<string | null>(null);

    const now = () => {
        const current = new Date();
        return current.toLocaleString();
    };

    

    useEffect(() => {
        setTime(now());
        console.log("Current time: ", time);
    }, []);

  return (
    <div className="flex" data-theme="luxury">
      {/* Sidebar */}
      <div
        // state to control width and visibility
        className={`fixed h-1/4 transition-all duration-300 z-10 ml-32 w-72 top-6 left-0 font-mono pt-5 bg-[#20171e] rounded-xl`}>
        {/* Sidebar content */}

        <div className="flex flex-col items-center">
            <div className="flex flex-col items-center">
                <div className="mt-4">
                <h1>OpenDRAG</h1>
            </div>
                <p>DateTime:</p>
                <p> {time}</p>
            </div>
        </div>
      </div>
      {/* Main content */}
      <div className={`flex-1 p-4 ml-64`}>
      </div>
    </div>
  );
};

export default SimDataDisplayPanel