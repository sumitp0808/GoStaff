import React from 'react';

const OverviewCard = ({ thumbnail, number, text, gradient }) => {
  return (
    <div className={`flex justify-between items-center p-4 rounded-md text-white ${gradient} shadow-sm`}>
      <div>
        <h2 className="text-3xl font-bold">{number}</h2>
        <p className="text-sm uppercase tracking-wide">{text}</p>
      </div>
      <div className="text-4xl opacity-80">
        {thumbnail}
      </div>
    </div>
  );
};

export default OverviewCard;
