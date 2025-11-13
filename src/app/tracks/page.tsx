'use client';
import React, { useState, useEffect } from 'react'
import TrackEditSidebar from '../components/TrackEditSidebar/TrackEditSidebar';
import Navbar from '../components/Navbar/Navbar'
import CSVImporterBox from '../components/CSVImporterBox/CSVImporterBox';
import TrackEditModal from '../components/TrackEditModal/TrackEditModal';

type TrackData = Record<string, any>;

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

const TracksPage: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<string | number | null>(null);
  const [trackData, setTrackData] = useState<TrackData | null>(null);
  const [modalOpen, setIsModalOpen] = useState(false);

  const handleTrackSelect = (id: number) => {
    setSelectedTrack(id);
  };

  const getTrackData = async (id: number) => {
    const res = await fetch(`/api/get_track?track_id={id}`.replace('{id}', id.toString()), {
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
            <TrackEditModal isOpen={modalOpen} onClose={() => setIsModalOpen(false)} initTrackData={trackData as Record<string, any> | null} />
            
            {/* <DataTable objects={trackData ? [trackData] : []} /> */}
            {selectedTrack === -1 ? (
              <div className="flex flex-col items-center">
                <p>Add a new track</p>
                <CSVImporterBox />
              </div>
            ) : selectedTrack ? (
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-4 mb-4">
                  <p>{trackData?.track_name || 'N/A'}</p>
                  {selectedTrack !== -1 && (
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
                      {trackData && Object.entries(trackData)
                        .filter(([key]) => key !== 'id' && key != "track_name")
                        .sort(([a], [b]) => {
                          // Sort: track_name first, then alphabetically
                          if (a === 'track_name') return -1;
                          if (b === 'track_name') return 1;
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
              <p>Select a Track</p>
            )}
        </div>
        <TrackEditSidebar onSelect={handleTrackSelect} />
      </div>
    </>
  );
};

export default TracksPage