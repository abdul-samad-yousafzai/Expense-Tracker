import React, { useEffect, useState, useMemo } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import DashboardCard from '../../components/DashboardCard';
import ChartCard from '../../components/ChartCard';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { FiTrendingUp, FiArrowUpRight, FiArrowDownRight, FiShield } from 'react-icons/fi';
import api from '../../services/api';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader';

const COLORS = ['#6366f1', '#38bdf8', '#7c3aed', '#fb7185', '#34d399'];

const Home = () => {
  const [summary, setSummary] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatCurrency = (value) =>
    `Rs ${new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value ?? 0)}`;

  useEffect(() => {
    const loadData = async () => {
      try {
        const [summaryRes, analyticsRes] = await Promise.all([
          api.get('/dashboard/summary'),
          api.get('/dashboard/analytics'),
        ]);
        setSummary(summaryRes.data.data);
        setAnalytics(analyticsRes.data.data);
      } catch (err) {
        console.error(err);
        toast.error('Unable to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const barData = useMemo(() => analytics?.monthlyTrend || [], [analytics]);
  const pieData = useMemo(
    () => analytics?.categoryBreakdown?.map((item) => ({ name: item.category, value: item.amount })) || [],
    [analytics]
  );

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-[calc(100vh-160px)] flex items-center justify-center">
          <Loader />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <DashboardCard title="Total Balance" value={formatCurrency(summary?.balance)} icon={<FiTrendingUp />} />
          <DashboardCard title="Total Income" value={formatCurrency(summary?.totalIncome)} icon={<FiArrowUpRight />} />
          <DashboardCard title="Total Expense" value={formatCurrency(summary?.totalExpense)} icon={<FiArrowDownRight />} />
          <DashboardCard title="Savings" value={formatCurrency(summary?.savings)} icon={<FiShield />} />
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <ChartCard title="Monthly Income vs Expense">
            <div className="h-[360px] w-full min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 24, right: 24, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} tickLine={false} axisLine={false} width={48} />
                  <Tooltip wrapperStyle={{ borderRadius: 12, backgroundColor: '#0f172a', border: '1px solid #334155' }} />
                  <Bar dataKey="income" fill="#38bdf8" radius={[12, 12, 0, 0]} />
                  <Bar dataKey="expense" fill="#fb7185" radius={[12, 12, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard title="Expense Breakdown">
            <div className="h-[360px] w-full min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={64} outerRadius={96} paddingAngle={4}>
                    {pieData.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend verticalAlign="bottom" wrapperStyle={{ color: '#cbd5e1', fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-slate-950/40">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {summary?.expenses?.length ? (
                summary.expenses.map((item) => (
                  <div key={item._id} className="flex items-center justify-between gap-4 rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-white">{item.title}</p>
                      <p className="text-sm text-slate-400">{item.category}</p>
                    </div>
                    <span className="whitespace-nowrap text-emerald-400">-{formatCurrency(item.amount)}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-400">No recent activity available.</p>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-slate-950/40">
            <h3 className="text-lg font-semibold text-white mb-4">Monthly Snapshot</h3>
            <div className="space-y-3 text-slate-300">
              <div className="flex items-center justify-between rounded-3xl bg-slate-950/70 p-4">
                <span>Income this month</span>
                <span className="font-semibold text-white">{formatCurrency(barData.slice(-1)[0]?.income ?? 0)}</span>
              </div>
              <div className="flex items-center justify-between rounded-3xl bg-slate-950/70 p-4">
                <span>Expense this month</span>
                <span className="font-semibold text-white">{formatCurrency(barData.slice(-1)[0]?.expense ?? 0)}</span>
              </div>
              <div className="flex items-center justify-between rounded-3xl bg-slate-950/70 p-4">
                <span>Category insights</span>
                <span className="font-semibold text-white">{pieData.length} categories</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
