import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useContext(AuthContext);

  return (
    <div className="flex flex-col min-h-screen bg-surface text-body px-4 py-6 lg:px-8 transition-theme">
      <div className="flex-1">
        <div className="mx-auto grid max-w-[1500px] gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
          <aside className={`${sidebarOpen ? 'fixed inset-0 z-40 bg-slate-950/90 xl:static xl:bg-transparent xl:block' : 'hidden xl:block'} xl:col-span-1`}>
            <div className="h-full p-6 xl:sticky xl:top-6">
              <Sidebar />
            </div>
          </aside>

          <main className="min-w-0 space-y-6 xl:col-span-1">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <button
                className="rounded-2xl border border-theme bg-surface px-4 py-2 text-sm text-body xl:hidden"
                onClick={() => setSidebarOpen((prev) => !prev)}
              >
                Menu
              </button>
              <Navbar onLogout={logout} />
            </div>
            {children || <Outlet />}
          </main>
        </div>
      </div>
      <div className="mx-auto w-full max-w-[1500px]">
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
