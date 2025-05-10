'use client';

import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { ChartData } from 'chart.js';
import SkeletonChart from './SkeletonChart';
import { getDigitalInterestStats } from '@/lib/api';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type DigitalInterestStat = {
  _id: string;
  count: number;
};

export default function DigitalInterestChart() {
  const [data, setData] = useState<ChartData<'bar'> | null>(null);

  useEffect(() => {
    getDigitalInterestStats()
      .then((stats: DigitalInterestStat[]) => {
        setData({
          labels: stats.map((item) => item._id),
          datasets: [{
            label: 'Minat Digital',
            data: stats.map((item) => item.count),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
          }]
        });
      })
      .catch(err => console.error('Error fetching digital interest:', err));
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300">
      <h2 className="text-xl font-semibold mb-4 text-center">Minat Digital</h2>
      <div className="w-full h-[400px] flex items-center justify-center">
        {data ? <Bar data={data} options={{ responsive: true }} /> : <SkeletonChart />}
      </div>
    </div>
  );
}
