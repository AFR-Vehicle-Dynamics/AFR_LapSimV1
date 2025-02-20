import React, {useEffect} from 'react'
import { parseAsInteger, useQueryState } from 'nuqs';

const SimDVTLToggle = () => {
  const [openMode, setOpenMode] = useQueryState('options');
  const handleSelect = (value: string) => {
    setOpenMode(value);
  };

  // Upon initial render, set the default value to OpenDrag
  useEffect(() => {
    handleSelect("OpenDrag");
  }, []);
  
  return (
    <div>
        <div className="join absolute top-8 right-72 w-64">
            <input
            className="join-item btn btn-outline w-32"
            type="radio"
            name="options"
            aria-label="OpenDrag"
            onClick={(e) => handleSelect(e.currentTarget.value)}
            defaultChecked
            value="OpenDrag" />
            <input className="join-item btn btn-outline w-32" type="radio" name="options" aria-label="OpenVehicle" value="OpenVehicle" onClick={(e) => handleSelect(e.currentTarget.value)}/>
            <input className="join-item btn btn-outline w-32" type="radio" name="options" aria-label="OpenTrack" value="OpenTrack" onClick={(e) => handleSelect(e.currentTarget.value)} />
            <input className="join-item btn btn-outline w-32" type="radio" name="options" aria-label="OpenLap" value="OpenLap" onClick={(e) => handleSelect(e.currentTarget.value)} />
        </div>
    </div>
  )
}

export default SimDVTLToggle