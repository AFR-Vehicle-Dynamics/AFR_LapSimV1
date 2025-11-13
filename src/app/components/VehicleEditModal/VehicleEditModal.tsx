'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import CSVImporterBox from '../CSVImporterBox/CSVImporterBox';

interface VehicleData {
    id: number;
    vehicle_name: string;
    vehicle_type: string;
    total_mass: number;
  }

interface VehicleEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    initVehicleData: Record<string, unknown> | null;
}

const VehicleEditModal: React.FC<VehicleEditModalProps> = ({ isOpen, onClose, initVehicleData }) => {
    const [editable, setEditable] = React.useState(false);
    // const [selectedVehicle, setSelectedVehicle] = useState<string | number | null>(null);
    const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);

    const toggleEditable = () => {
    setEditable(!editable);
    };

    const editVehicleData = async (id: number) => {
        console.log("vehicle submit\n", id);
        console.log(vehicleData);
        const res = await fetch(`http://localhost:3000/api/edit_vehicle`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vehicleData),
        });
        const data = await res.json();
        // setVehicleData(data); data is already updated from tvehicledata
        console.log(data);
        return data;
    };

    useEffect(() => {
        console.log('initVehicleData:', initVehicleData);
        if (initVehicleData) {
            setVehicleData(initVehicleData as VehicleData);
        }
    }, [initVehicleData]);

  return (
    <div>
        <dialog id="edit_modal" className="modal bg-[#20171e] items-center justify-center p-4 w-96 h-96 rounded-2xl">
            <form onSubmit={(e) => {
            console.log('selectedVehicle:', vehicleData);
            e.preventDefault();
            if (e.target) {
                editVehicleData(vehicleData?.id as number);
            }
            const modal = document.getElementById('edit_modal') as HTMLDialogElement;
            if (modal) {
                modal.close();
            }
            }}>
                <div className="form-control">
                    <label className="label">
                    <span className="label-text">Vehicle Name</span>
                    </label>
                    <input
                    type="text"
                    placeholder="Vehicle Name"
                    className="input input-bordered"
                    value={vehicleData?.vehicle_name || ''}
                    onChange={(e) => setVehicleData({ ...vehicleData, vehicle_name: e.target.value } as VehicleData)}
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                    <span className="label-text">Type</span>
                    </label>
                    <input
                    type="text"
                    placeholder="Country"
                    className="input input-bordered"
                    value={vehicleData?.vehicle_type || ''}
                    onChange={(e) => setVehicleData({ ...vehicleData, vehicle_type: e.target.value } as VehicleData)}
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                    <span className="label-text">Total Mass</span>
                    </label>
                    <input
                    type="text"
                    placeholder="Total Mass"
                    className="input input-bordered"
                    value={vehicleData?.total_mass || ''}
                    onChange={(e) => setVehicleData({ ...vehicleData, total_mass: parseFloat(e.target.value) } as VehicleData)}
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

export default VehicleEditModal