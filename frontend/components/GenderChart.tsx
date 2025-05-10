'use client';

import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import SkeletonChart from './SkeletonChart';
import { getGenderStats } from '@/lib/api';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function GenderChart() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getGenderStats()
      .then(stats => {
        setData({
          labels: stats.map((item: any) => item._id),
          datasets: [{
            label: 'Jumlah',
            data: stats.map((item: any) => item.count),
            backgroundColor: ['rgba(75, 192, 192, 0.7)', 'rgba(255, 99, 132, 0.7)'],
          }]
        });
      })
      .catch(err => console.error('Error fetching gender stats:', err));
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">Jenis Kelamin</h2>
      <div className="w-full h-[400px] flex items-center justify-center">
        {data ? <Pie data={data} options={{ responsive: true }} /> : <SkeletonChart />}
      </div>
    </div>
  );
}