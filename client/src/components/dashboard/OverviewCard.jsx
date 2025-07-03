import React from 'react';

const OverviewCard = ({ thumbnail, number, text, iconColor = 'text-gray-600', iconBg = 'bg-gray-100' }) => {
  return (
    <div className="flex justify-between items-center p-6 rounded-xl bg-white shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
      <div>
        <h2 className="text-3xl font-bold text-gray-800">{number}</h2>
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{text}</p>
      </div>
      <div className={`w-14 h-14 flex items-center justify-center rounded-full ${iconBg}`}>
        <span className={`text-2xl ${iconColor}`}>
          {thumbnail}
        </span>
      </div>
    </div>
  );
};

export default OverviewCard;
