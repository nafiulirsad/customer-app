'use client';

import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import SkeletonChart from './SkeletonChart';
import { getLocationTypeStats } from '@/lib/api';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { ChartData } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

type LocationStat = {
  _id: string;
  count: number;
};

export default function LocationTypeChart() {
  const [data, setData] = useState<ChartData<'doughnut'> | null>(null);

  useEffect(() => {
    getLocationTypeStats()
      .then((stats: LocationStat[]) => {
        setData({
          labels: stats.map((item) => item._id),
          datasets: [
            {
              label: 'Lokasi',
              data: stats.map((item) => item.count),
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
              ],
            },
          ],
        });
      })
      .catch((err) => console.error('Error fetching location type stats:', err));
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300">
      <h2 className="text-xl font-semibold mb-4 text-center">Tipe Lokasi</h2>
      <div className="w-full h-[400px] flex items-center justify-center">
        {data ? <Doughnut data={data} options={{ responsive: true }} /> : <SkeletonChart />}
      </div>
    </div>
  );
}
