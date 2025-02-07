import React, {useEffect, useState} from 'react'
import Papa from 'papaparse';

const acceptableCSVFileTypes = '.csv';


const CSVImporterBox = () => {
    const [error, setError] = useState(false);

    const onFileChangeHandler = (event: any) => {
        console.log(event.target.files[0]);
        const csvFile = event.target.files[0];
        let result;
        if (csvFile.type !== 'text/csv') {
            // console.error("Invalid file format. Please upload a CSV file.");
            setError(true);
            return;
        } else {
            setError(false);
        }

        Papa.parse<File>(csvFile, {
            skipEmptyLines: true,
            complete: function(results: Papa.ParseResult<any>) {
            console.log("Finished!", results.data);
            result = addVehicle(results.data);
            },
            error: function(error) {
            console.error("Error parsing CSV file:", error);
            }
        });
    }

    const addVehicle = async (data: any[]) => {
        const res = await fetch('http://localhost:3000/api/add_vehicle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "vehicle_name": data[1][2] ?? '',
                "vehicle_type": data[2][2] ?? '',
                "total_mass": parseFloat(data[3][2] ?? '0'),
                "fm_distribution": parseFloat(data[4][2] ?? '0'),
                "wheelbase": parseInt(data[5][2] ?? '0'),
                "steering_rack_ratio": parseFloat(data[6][2] ?? '0'),
                "lift_coef": parseFloat(data[7][2] ?? '0'),
                "drag_coef": parseFloat(data[8][2] ?? '0'),
                "cl_scale_mult": parseFloat(data[9][2] ?? '0'),
                "cd_scale_mult": parseFloat(data[10][2] ?? '0'),
                "fa_distribution": parseFloat(data[11][2] ?? '0'),
                "frontal_area": parseFloat(data[12][2] ?? '0'),
                "air_density": parseFloat(data[13][2] ?? '0'),
                "disc_outer_dia": parseFloat(data[14][2] ?? '0'),
                "pad_height": parseFloat(data[15][2] ?? '0'),
                "pad_f_coef": parseFloat(data[16][2] ?? '0'),
                "caliper_num_pistons": parseInt(data[17][2] ?? '0'),
                "caliper_piston_dia": parseFloat(data[18][2] ?? '0'),
                "master_cylinder_dia": parseFloat(data[19][2] ?? '0'),
                "pedal_ratio": parseFloat(data[20][2] ?? '0'),
                "grip_factor_mult": parseFloat(data[21][2] ?? '0'),
                "tyre_r": parseFloat(data[22][2] ?? '0'),
                "rolling_resistance": parseFloat(data[23][2] ?? '0'),
                "long_friction_coef": parseFloat(data[24][2] ?? '0'),
                "long_friction_load_rating": parseFloat(data[25][2] ?? '0'),
                "long_friction_sensitivity": parseFloat(data[26][2] ?? '0'),
                "lat_friction_coef": parseFloat(data[27][2] ?? '0'),
                "lat_friction_load_rating": parseFloat(data[28][2] ?? '0'),
                "lat_friction_sensitivity": parseFloat(data[29][2] ?? '0'),
                "front_cornering_stiffness": parseFloat(data[30][2] ?? '0'),
                "rear_cornering_stiffness": parseFloat(data[31][2] ?? '0'),
                "power_factor_mult": parseFloat(data[32][2] ?? '0'),
                "thermal_eff": parseFloat(data[33][2] ?? '0'),
                "fuel_lower_heating_value": parseFloat(data[34][2] ?? '0'),
                "drive_type": data[35][2] ?? '',
                "gear_shift_time": parseFloat(data[36][2] ?? '0'),
                "primary_gear_eff": parseFloat(data[37][2] ?? '0'),
                "final_gear_eff": parseFloat(data[38][2] ?? '0'),
                "gearbox_eff": parseFloat(data[39][2] ?? '0'),
                "primary_gear_reduc": parseFloat(data[40][2] ?? '0'),
                "final_gear_reduc": parseFloat(data[41][2] ?? '0'),
                "first_gear_ratio": parseFloat(data[42][2] ?? '0'),
                "second_gear_ratio": parseFloat(data[43][2] ?? '0'),
                "third_gear_ratio": parseFloat(data[44][2] ?? '0'),
                "fourth_gear_ratio": parseFloat(data[45][2] ?? '0'),
                "fifth_gear_ratio": parseFloat(data[46][2] ?? '0'),
                "sixth_gear_ratio": parseFloat(data[47][2] ?? '0')
            }),
        })

        const result = await res.json()
        return result;
    }

    return (
        <div className="flex flex-col items-center" data-theme="luxury">
            <input 
            id='csvFileSelector' 
            type='file' 
            onChange={onFileChangeHandler}
            className="border border-gray-300 p-2 rounded"
            />
            {/* Make a button */}
            {error && <p className="text-red-500 mt-2">Invalid file format. Please upload a CSV file.</p>}
        </div>

    )
}

export default CSVImporterBox
