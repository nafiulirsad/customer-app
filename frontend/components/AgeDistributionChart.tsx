'use client';

import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { ChartData } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import { getAgeDistribution } from '@/lib/api';
import SkeletonChart from './SkeletonChart';

// Define expected data structure for the age distribution
type AgeDistributionResult = {
  labels: string[];  // Labels for the X-axis (e.g., age groups)
  counts: number[];  // Data points for each label
};

export default function AgeDistributionChart() {
  const [data, setData] = useState<ChartData<'line'> | null>(null);

  useEffect(() => {
    getAgeDistribution()
      .then((result: AgeDistributionResult) => {
        setData({
          labels: result.labels,
          datasets: [{
            label: 'Jumlah Pelanggan',
            data: result.counts,
            borderColor: 'rgba(153, 102, 255, 1)',
            fill: false,
            tension: 0.3
          }]
        });
      })
      .catch(err => console.error('Error fetching age distribution:', err));
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300">
      <h2 className="text-xl font-semibold mb-4 text-center">📈 Distribusi Usia</h2>
      <div className="w-full h-[400px] flex items-center justify-center">
        {data ? <Line data={data} options={{ responsive: true }} /> : <SkeletonChart />}
      </div>
    </div>
  );
}
