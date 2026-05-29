import React from 'react';

const DashboardCard = ({ title, value, icon, className }) => {
  return (
    <div className={`rounded-3xl border border-theme bg-surface p-5 shadow-lg shadow-slate-950/10 transition-theme ${className || ''}`}>
      <div className="flex items-center justify-between gap-4 min-w-0">
        <div className="min-w-0">
          <p className="text-sm uppercase tracking-[0.18em] text-muted">{title}</p>
          <p className="mt-3 break-words text-3xl font-semibold text-body">{value}</p>
        </div>
        <div className="flex-shrink-0 text-3xl text-indigo-400">{icon}</div>
      </div>
    </div>
  );
};

export default DashboardCard;
