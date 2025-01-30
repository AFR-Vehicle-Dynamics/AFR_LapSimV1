import React, {useEffect} from 'react'
import Papa from 'papaparse';

const acceptableCSVFileTypes = '.csv';


const CSVImporterBox = () => {

    const onFileChangeHandler = (event: any) => {
        console.log(event.target.files[0]);
        const csvFile = event.target.files[0];
        let result;
        Papa.parse<File>(csvFile, {
            skipEmptyLines: true,
            complete: function(results: Papa.ParseResult<any>) {
                console.log("Finished!", results.data);
                // let lastFilledFirstElement: string | null = null;
                // const jsonData = results.data.map((row: any, index: number) => {
                //     if (!row[0] && lastFilledFirstElement !== null) {
                //         row[0] = lastFilledFirstElement;
                //     } else {
                //         lastFilledFirstElement = row[0];
                //     }
                //     return {
                //         id: index,
                //         column1: row[0],
                //         column2: row[1],
                //         column3: row[2],
                //     };
                // });
                result = addVehicle(results.data);
            }
        });
    }

    useEffect(() => {
        fetch("http://localhost:3000/api/hello").then(
            response => response.json()
        ).then((data) => {
            console.log(data);
        });
    }, []);

    const addVehicle = async (data: any[]) => {
        const res = await fetch('/api/route-name', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "vehicle_name": data[1][2],
                "vehicle_type": data[2][2],
                "total_mass": parseFloat(data[3][2])
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
        </div>

    )
}

export default CSVImporterBox
