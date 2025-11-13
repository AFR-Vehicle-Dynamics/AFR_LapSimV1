'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import CSVImporterBox from '../CSVImporterBox/CSVImporterBox';

interface TracksData {
  track_name: string;
  id: number;
  country: string;
  city: string;
}

interface TrackEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    initTrackData: Record<string, unknown> | null;
  }

const TrackEditModal: React.FC<TrackEditModalProps> = ({ isOpen, onClose, initTrackData }) => {
    const [editable, setEditable] = React.useState(false);
    // const [selectedTrack, setSelectedTrack] = useState<string | number | null>(null);
    const [trackData, setTrackData] = useState<TracksData | null>(null);

    const toggleEditable = () => {
    setEditable(!editable);
    };

    const editTrackData = async (id: number) => {
        console.log("track submit\n", id);
        console.log(trackData);
        const res = await fetch(`http://localhost:3000/api/edit_track`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(trackData),
        });
        const data = await res.json();
        // setTrackData(data); data is already updated from trackdata
        console.log(data);
        return data;
    };

    useEffect(() => {
        console.log('initTrackData:', initTrackData);
        if (initTrackData) {
            setTrackData(initTrackData as TracksData);
        }
    }, [initTrackData]);

  return (
    <div>
        <dialog id="edit_modal" className="modal bg-[#20171e] items-center justify-center p-4 w-96 h-96 rounded-2xl">
            <form onSubmit={(e) => {
            console.log('selectedTrack:', trackData);
            e.preventDefault();
            if (e.target) {
                editTrackData(trackData?.id as number);
            }
            const modal = document.getElementById('edit_modal') as HTMLDialogElement;
            if (modal) {
                modal.close();
            }
            }}>
                <div className="form-control">
                    <label className="label">
                    <span className="label-text">Track Name</span>
                    </label>
                    <input
                    type="text"
                    placeholder="Track Name"
                    className="input input-bordered"
                    value={trackData?.track_name || ''}
                    onChange={(e) => setTrackData({ ...trackData, track_name: e.target.value } as TracksData)}
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                    <span className="label-text">Country</span>
                    </label>
                    <input
                    type="text"
                    placeholder="Country"
                    className="input input-bordered"
                    value={trackData?.country || ''}
                    onChange={(e) => setTrackData({ ...trackData, country: e.target.value } as TracksData)}
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                    <span className="label-text">City</span>
                    </label>
                    <input
                    type="text"
                    placeholder="City"
                    className="input input-bordered"
                    value={trackData?.city || ''}
                    onChange={(e) => setTrackData({ ...trackData, city: e.target.value } as TracksData)}
                    />
                </div>
                <div className="modal-action">
                    <button type="submit" className="btn">Save</button>
                    <button type="button" className="btn" onClick={() => {
                    const modal = document.getElementById('edit_modal') as HTMLDialogElement;
                    if (modal) {
                        modal.close();
                    }
                    }}>Cancel</button>
                </div>
            </form>
        </dialog>
    </div>
  );
};

export default TrackEditModal