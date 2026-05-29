import React from 'react';

const ChartCard = ({ title, children }) => {
  return (
    <div className="rounded-3xl border border-theme bg-surface p-5 shadow-lg shadow-slate-950/10 transition-theme">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-body">{title}</h3>
      </div>
      {children}
    </div>
  );
};

export default ChartCard;
