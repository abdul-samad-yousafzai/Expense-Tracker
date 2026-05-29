import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiTrendingUp, FiCreditCard, FiPieChart, FiUser } from 'react-icons/fi';

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: <FiHome /> },
  { label: 'Income', to: '/income', icon: <FiCreditCard /> },
  { label: 'Expense', to: '/expense', icon: <FiTrendingUp /> },
  { label: 'Analytics', to: '/analytics', icon: <FiPieChart /> },
  { label: 'Profile', to: '/profile', icon: <FiUser /> },
];

const Sidebar = ({ className }) => {
  return (
    <aside className={`w-full max-w-[280px] ${className || ''}`}>
      <div className="space-y-8 rounded-3xl border border-theme bg-surface p-6 shadow-2xl shadow-slate-950/10 transition-theme">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.3em] text-muted">Expense Tracker Pro</p>
          <h2 className="text-2xl font-semibold text-body">Finance HQ</h2>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${isActive ? 'bg-indigo-500/15 text-body shadow shadow-indigo-500/10' : 'text-muted hover:bg-slate-100/70 hover:text-body'}`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
