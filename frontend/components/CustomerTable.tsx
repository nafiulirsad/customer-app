'use client';

import { useEffect, useState } from 'react';
import { getCustomers } from '@/lib/api';

// Define the Customer type
interface Customer {
  _id: string;
  name: string;
  age: number;
  gender: string;
  locationType?: string;
}

export default function CustomerTable() {
  const [data, setData] = useState<Customer[]>([]); // Use the Customer type
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCustomers(page)
      .then((customers: Customer[]) => setData(customers)) // Type the response from getCustomers
      .finally(() => setLoading(false));
  }, [page]);

  if (loading && page === 1) return <SkeletonTable />;

  return (
    <div className="overflow-x-auto">
      <div className="px-4 sm:px-6 lg:px-8 py-6 w-full max-w-6xl mx-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-sm table-fixed">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Nama</th>
              <th className="py-3 px-4 text-left">Usia</th>
              <th className="py-3 px-4 text-left">Jenis Kelamin</th>
              <th className="py-3 px-4 text-left">Lokasi</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((cust) => (
                <tr key={cust._id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">{cust.name}</td>
                  <td className="py-3 px-4">{cust.age}</td>
                  <td className="py-3 px-4 capitalize">{cust.gender}</td>
                  <td className="py-3 px-4">{cust.locationType || 'Unknown'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  Tidak ada data pelanggan
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          <span>Halaman: {page}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

// Skeleton Loader untuk tabel
function SkeletonTable() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-200 rounded w-full"></div>
      <div className="h-8 bg-gray-200 rounded w-full"></div>
      <div className="h-8 bg-gray-200 rounded w-3/4"></div>
    </div>
  );
}
