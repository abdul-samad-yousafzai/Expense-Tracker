import React from 'react';

const EmptyState = ({ title, subtitle }) => (
  <div className="rounded-3xl border border-dashed border-white/10 bg-slate-950/70 p-8 text-center text-slate-400">
    <p className="text-xl font-semibold text-white mb-2">{title}</p>
    <p>{subtitle}</p>
  </div>
);

export default EmptyState;
