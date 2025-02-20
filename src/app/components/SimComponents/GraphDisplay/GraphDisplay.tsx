import React from 'react'
import SimDVTLToggle from '../SimDVTLToggle/SimDVTLToggle'

const GraphDisplay = () => {
  return (
    <div className='w-full h-full flex items-center top-6 bottom-8 justify-center rounded-3xl bg-[#110e12]' data-theme="luxury">
        <p>Configure control panel</p>
        <SimDVTLToggle/>
    </div>
  )
}

export default GraphDisplay