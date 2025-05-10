'use client';

export default function SkeletonChart() {
  return (
    <div className="h-64 flex items-center justify-center">
      <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
    </div>
  );
}