import React, { useContext, useEffect, useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { AuthContext } from '../../context/AuthContext';
import { FiMail, FiUser, FiCalendar, FiLock, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, updateProfile, updatePassword } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({ name: '', email: '' });
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '' });
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileData({ name: user.name || '', email: user.email || '' });
    }
  }, [user]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsUpdatingProfile(true);

    try {
      await updateProfile(profileData);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Unable to update profile');
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setIsUpdatingPassword(true);

    try {
      await updatePassword(passwordData);
      toast.success('Password updated successfully');
      setPasswordData({ currentPassword: '', newPassword: '' });
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Unable to update password');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-lg shadow-slate-950/40">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Profile</p>
              <h1 className="text-3xl font-semibold text-white">{user?.name || 'Your Profile'}</h1>
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
              <div className="flex items-center gap-3 text-indigo-400"><FiUser /></div>
              <p className="mt-4 text-sm text-slate-400">Full name</p>
              <p className="mt-2 text-lg font-semibold text-white">{user?.name || '-'}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
              <div className="flex items-center gap-3 text-indigo-400"><FiMail /></div>
              <p className="mt-4 text-sm text-slate-400">Email address</p>
              <p className="mt-2 text-lg font-semibold text-white">{user?.email || '-'}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
              <div className="flex items-center gap-3 text-indigo-400"><FiCalendar /></div>
              <p className="mt-4 text-sm text-slate-400">Account created</p>
              <p className="mt-2 text-lg font-semibold text-white">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
              <div className="flex items-center gap-3 text-emerald-400"><FiCheckCircle /></div>
              <p className="mt-4 text-sm text-slate-400">Member status</p>
              <p className="mt-2 text-lg font-semibold text-white">Premium access</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-lg shadow-slate-950/40">
            <h2 className="text-xl font-semibold text-white">Update profile</h2>
            <p className="mt-2 text-sm text-slate-400">Edit your display name and email address.</p>

            <form onSubmit={handleProfileSubmit} className="mt-8 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400">Full name</label>
                <input
                  value={profileData.name}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
                  className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-indigo-400"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400">Email address</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                  className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-indigo-400"
                  placeholder="you@example.com"
                />
              </div>
              <button
                type="submit"
                disabled={isUpdatingProfile}
                className="inline-flex items-center justify-center rounded-3xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isUpdatingProfile ? 'Saving...' : 'Save changes'}
              </button>
            </form>
          </section>

          <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-lg shadow-slate-950/40">
            <h2 className="text-xl font-semibold text-white">Change password</h2>
            <p className="mt-2 text-sm text-slate-400">Keep your account secure with a strong password.</p>

            <form onSubmit={handlePasswordSubmit} className="mt-8 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400">Current password</label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData((prev) => ({ ...prev, currentPassword: e.target.value }))}
                  className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-indigo-400"
                  placeholder="Current password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400">New password</label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData((prev) => ({ ...prev, newPassword: e.target.value }))}
                  className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-indigo-400"
                  placeholder="New password"
                />
              </div>
              <button
                type="submit"
                disabled={isUpdatingPassword}
                className="inline-flex items-center justify-center rounded-3xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isUpdatingPassword ? 'Updating...' : 'Update password'}
              </button>
            </form>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
