// app/page.tsx

import CustomerTable from '@/components/CustomerTable';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">👥 Daftar Pelanggan</h1>
        <div className="bg-white rounded-xl shadow-lg p-6 transition-transform transform hover:scale-[1.01] duration-300">
          <CustomerTable />
        </div>
      </div>
    </main>
  );
}