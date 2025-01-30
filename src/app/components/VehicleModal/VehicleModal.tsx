'use client';
import React, { useRef } from 'react';
import { GiRaceCar } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

const VehicleModal = ({ id }: { id: string }) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const openModal = () => {
    modalRef.current?.showModal();
  };
  return (
    <>
      <button className="btn font-mono btn-outline hover:text-blue-500 w-64" onClick={() => {
        const modal = document.getElementById('GASTLY') as HTMLDialogElement | null;
        if (modal) {
          modal.showModal();
        }
      }}>{id}</button>
      
      <dialog id="GASTLY" className="modal">
        <div className="modal-box h-100 w-11/12 max-w-3xl" style={{ backgroundColor: '#171217' }}>
          <h3 className="font-bold text-lg text-center"><GiRaceCar className="w-10 h-10 text-yellow-500" />{id}</h3>
          <div>
            <table className="text-center table table-striped w-full">
              <thead>
              <tr>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
              </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr className="bg-base-200">
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                  <td>Blue</td>
                </tr>
                {/* row 2 */}
                <tr>
                  <td>Hart Hagerty</td>
                  <td>Desktop Support Technician</td>
                  <td>Purple</td>
                </tr>
                {/* row 3 */}
                <tr>
                  <td>Brice Swyre</td>
                  <td>Tax Accountant</td>
                  <td>Red</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn"><IoMdClose className="w-5 h-5"/></button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default VehicleModal