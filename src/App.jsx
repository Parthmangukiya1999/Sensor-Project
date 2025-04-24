import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';

function App() {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Update this with your Azure backend URL
        const response = await axios.get('https://kk1.azurewebsites.net/SensorReadings');  // Replace with your backend API URL
        
        // Convert all values to proper types
        const formattedData = response.data.map(item => ({
          timestamp: new Date(item.time), // Convert timestamp to Date object
          temp: Number(item.temp),             // Ensure temp is a number
          humidity: Number(item.humidity)      // Ensure humidity is a number
        }));
        
        setSensorData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Fetch data when component mounts
    const interval = setInterval(fetchData, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  // Prepare chart data
  const chartData = [
    ['Time', 'Temperature (°C)', 'Humidity (%)'],
    ...sensorData.map(item => [
      item.timestamp, // Time as Date object
      item.temp,      // Temperature value
      item.humidity   // Humidity value
    ])
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Temperature and Humidity Monitoring</h1>
      <Chart
        chartType="LineChart"
        width="100%"
        height="400px"
        data={chartData}
        options={{
          title: 'Temperature and Humidity Monitoring',
          hAxis: {
            title: 'Time',
            format: 'HH:mm', // Show time in hour:minute format
          },
          vAxis: {
            title: 'Value',
            viewWindow: {
              min: 0 // Set the minimum value for the axis
            }
          },
          series: {
            0: { targetAxisIndex: 0 }, // Assign temperature to the first axis
            1: { targetAxisIndex: 1 }  // Assign humidity to the second axis
          },
          axes: {
            y: {
              0: { title: 'Temperature (°C)' }, // Label for the first axis (Temperature)
              1: { title: 'Humidity (%)' }      // Label for the second axis (Humidity)
            }
          }
        }}
      />
    </div>
  );
}

export default App;
