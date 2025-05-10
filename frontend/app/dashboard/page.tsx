// app/dashboard/page.tsx

import GenderChart from '@/components/GenderChart';
import DigitalInterestChart from '@/components/DigitalInterestChart';
import LocationTypeChart from '@/components/LocationTypeChart';
import DeviceBrandChart from '@/components/DeviceBrandChart';
import AgeDistributionChart from '@/components/AgeDistributionChart';

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-indigo-50 py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <section className="text-center">
          <h1 className="text-5xl font-bold text-indigo-700 mb-4">📊 Statistik Pelanggan</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Analisis data pelanggan berdasarkan gender, minat digital, usia, lokasi, dan merek perangkat.
          </p>
        </section>

        {/* Chart Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <GenderChart />
          <DigitalInterestChart />
          <LocationTypeChart />
          <DeviceBrandChart />
        </section>

        {/* Distribusi Usia */}
        <section className="flex flex-col items-center">
          <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
            <AgeDistributionChart />
          </div>
        </section>
      </div>
    </main>
  );
}