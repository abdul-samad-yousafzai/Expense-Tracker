import React from 'react';

const TransactionCard = ({ title, category, amount, date, type, onEdit, onDelete }) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-4 shadow-lg shadow-slate-950/20 transition hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-white">{title}</h3>
          <p className="mt-1 text-sm text-slate-400">{category}</p>
        </div>
        <p className={`text-sm font-semibold ${type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
          {type === 'income' ? '+ Rs ' : '- Rs '}{amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      </div>
      <div className="mt-3 flex items-center justify-between text-sm text-slate-400">
        <span>{new Date(date).toLocaleDateString()}</span>
        <div className="flex gap-2">
          <button onClick={onEdit} className="rounded-full border border-white/10 px-3 py-1 text-slate-300 hover:bg-white/5">Edit</button>
          <button onClick={onDelete} className="rounded-full border border-white/10 px-3 py-1 text-rose-300 hover:bg-rose-500/10">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
