import { useEffect, useRef } from 'react';
import useGoogleCharts from '../../hooks/useGoogleCharts';

export default function TemperatureChart({ data }) {
  const chartRef = useRef(null);
  const google = useGoogleCharts();

  useEffect(() => {
    if (!google || !data.length) return;

    const drawChart = () => {
      const chartData = new google.visualization.DataTable();
      chartData.addColumn('number', 'Time Index');
      chartData.addColumn('number', 'Temperature (°C)');
      chartData.addColumn('number', 'Humidity (%)');

      const rows = data.map((item, index) => [
        index + 1,
        Number(item.temp),
        Number(item.humidity)
      ]);

      chartData.addRows(rows);

      const options = {
        title: 'Sensor Data Trends',
        curveType: 'function',
        legend: { position: 'bottom' },
        height: 400,
        series: {
          0: { color: '#FF6D00' },
          1: { color: '#4285F4' }
        }
      };

      const chart = new google.visualization.LineChart(chartRef.current);
      chart.draw(chartData, options);
    };

    google.charts.setOnLoadCallback(drawChart);
  }, [google, data]);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
}