'use client';
import React, { useState, useEffect } from 'react'
import TrackEditSidebar from '../components/TrackEditSidebar/TrackEditSidebar';
import Navbar from '../components/Navbar/Navbar'
import CSVImporterBox from '../components/CSVImporterBox/CSVImporterBox';
import TrackEditModal from '../components/TrackEditModal/TrackEditModal';

interface TracksData {
  track_name: string;
  id: number;
  country: string;
  city: string;
}

const TracksPage: React.FC<TracksData> = () => {
  const [selectedTrack, setSelectedTrack] = useState<string | number | null>(null);
  const [trackData, setTrackData] = useState<TracksData | null>(null);
  const [modalOpen, setIsModalOpen] = useState(false);

  const handleTrackSelect = (id: number) => {
    setSelectedTrack(id);
  };

  const getTrackData = async (id: number) => {
    const res = await fetch(`http://localhost:3000/api/get_track?track_id={id}`.replace('{id}', id.toString()), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    setTrackData(data);
    console.log(trackData);
    return data;
  }

  // update every time submit is clicked as well FIX THIS
  useEffect(() => { 
    if (typeof selectedTrack === 'number') {
      getTrackData(selectedTrack).then((data) => {
        console.log(data);
      });
    }
    }, [selectedTrack]);

  useEffect(() => {
    setSelectedTrack(1);
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
            {selectedTrack && selectedTrack !== -1 && (
              <button className="btn" onClick={() => {
              const modal = document.getElementById('edit_modal');
              if (modal) {
                (modal as HTMLDialogElement).showModal();
              }
              }}> Edit </button>
            )}

            <TrackEditModal isOpen={modalOpen} onClose={() => setIsModalOpen(false)} initTrackData={trackData} />
            
            {/* <DataTable objects={trackData ? [trackData] : []} /> */}
            {selectedTrack === -1 ? (
              <div className="flex flex-col items-center">
                <p>Add a new track</p>
                <CSVImporterBox />
              </div>
            ) : selectedTrack ? (
              <div className="flex flex-col items-center">
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
        <TrackEditSidebar onSelect={handleTrackSelect} />
      </div>
    </>
  );
};

export default TracksPage