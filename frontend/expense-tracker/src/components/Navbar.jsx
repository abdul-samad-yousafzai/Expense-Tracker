import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { FiBell, FiLogOut, FiMoon, FiSun } from 'react-icons/fi';

const Navbar = ({ onLogout }) => {
  const { user } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-theme bg-surface p-5 shadow-lg shadow-slate-950/10 transition-theme">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Welcome back</p>
        <h1 className="text-2xl font-semibold text-body">{user?.name || 'Guest'}</h1>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-2xl border border-theme bg-surface p-3 text-body hover:bg-slate-100/80"
        >
          {theme === 'dark' ? <FiSun /> : <FiMoon />}
        </button>
        <button className="rounded-2xl border border-theme bg-surface p-3 text-body hover:bg-slate-100/80">
          <FiBell />
        </button>
        <button
          onClick={onLogout}
          className="rounded-2xl border border-theme bg-indigo-500/15 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-500/20"
        >
          <span className="inline-flex items-center gap-2"><FiLogOut /> Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
