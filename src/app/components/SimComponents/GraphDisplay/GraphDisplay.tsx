'use client';
import React, { useEffect, useState } from 'react'
import SimDVTLToggle from '../SimDVTLToggle/SimDVTLToggle'
import OpenVehicleGraphDisplay from './OpenVehicleGraphDisplay/OpenVehicleGraphDisplay'
import { parseAsString, useQueryState } from 'nuqs'
import { Network } from 'vis-network';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type GraphData = {
  en_speed_curve: number[];
  en_power_curve: number[];
};

type DataPoint = {
  speed: number;
  power: number;
};

const GraphDisplay = () => {
  const [graphData, setData] = useState<GraphData | null>(null);
  const [engineData, setEngineData] = useState<DataPoint[]>();
  const [gearData, setGearData] = useState<DataPoint[]>();
  const [loadState, setLoading] = useState<number> (0); // 0: Start button, 1: Loading, 2: Loaded
  const [option] = useQueryState("options", parseAsString);
  const [vehicle] = useQueryState("vehicle", parseAsString);

  const runOpenVehicle = async () => {
    const response = await fetch(`/api/runOpenVEHICLE`);
    const data = await response.json();
    console.log("result: ", data);
    setData(data);
    return data;
  };

  const startSimulation = () => {
    console.log("here");
    setLoading(1); // Start loading up
    console.log(loadState);
    const fetchTestNum = async () => {
      try {
        const result = await runOpenVehicle();
        console.log(result);
      } catch (error) {
        console.error("Failed to fetch test number:", error);
      }
    };
    
    fetchTestNum();
    console.log("graphdata:", graphData);
    if (graphData) {
      console.log("in if statement");
      const combinedData: DataPoint[] = graphData['en_speed_curve'].map((speed, index) => ({
        speed,
        power: graphData['en_power_curve'][index],
      }));
      setEngineData(combinedData);
      setLoading(2);
      console.log(loadState);
    }
    console.log("finish");
  }

  // update testnum fetch
  useEffect(() => {
    console.log("option: ", option);
    setLoading(0); // reset
  }, [option]);

  useEffect(() => {
    if (graphData) {
      console.log("in if statement");
      const combinedData: DataPoint[] = graphData['en_speed_curve'].map((speed, index) => ({
        speed,
        power: graphData['en_power_curve'][index],
      }));
      setEngineData(combinedData);
      setLoading(2);
      console.log(loadState);
    }
    console.log("finish");
  }, [graphData]);

  return (
    <div className='w-full h-full flex items-center top-6 bottom-8 justify-center rounded-3xl bg-[#110e12]' data-theme="luxury">
      {1 ? (
        loadState === 0 ? (
          <button className="btn" onClick={() => startSimulation()}>Start Simulation</button>
        ) : loadState === 1 ? (
          <span className="loading loading-ring loading-xl"></span>
        ) : loadState === 2 && graphData ? (
          <ResponsiveContainer width="80%" height={400}>
              <LineChart data={engineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="speed" label={{ value: 'Engine Speed', position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: 'Power', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="power" stroke="#82ca9d" name="Engine Power" />
              </LineChart>
          </ResponsiveContainer>
        ) : null
      ) : (
        <p>Configure control panel</p>
      )}
      <SimDVTLToggle/>
    </div>
  )
}

export default GraphDisplay