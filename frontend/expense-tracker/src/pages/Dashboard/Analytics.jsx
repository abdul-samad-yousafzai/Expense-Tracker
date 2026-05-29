import React, { useEffect, useState, useMemo } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import ChartCard from '../../components/ChartCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import api from '../../services/api';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader';

const COLORS = ['#6366f1', '#38bdf8', '#7c3aed', '#fb7185', '#34d399'];

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const { data } = await api.get('/dashboard/analytics');
        setAnalytics(data.data);
      } catch (err) {
        console.error(err);
        toast.error('Unable to load analytics');
      } finally {
        setLoading(false);
      }
    };
    loadAnalytics();
  }, []);

  const pieData = useMemo(
    () => analytics?.categoryBreakdown?.map((item) => ({ name: item.category, value: item.amount })) || [],
    [analytics]
  );

  const barData = analytics?.monthlyTrend || [];

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
        <div className="grid gap-6 xl:grid-cols-2">
          <ChartCard title="Income / Expense Trend">
            <div className="h-[360px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" tick={{ fill: '#94a3b8' }} />
                  <YAxis tick={{ fill: '#94a3b8' }} />
                  <Tooltip wrapperStyle={{ borderRadius: 12 }} />
                  <Bar dataKey="income" fill="#38bdf8" radius={[12, 12, 0, 0]} />
                  <Bar dataKey="expense" fill="#fb7185" radius={[12, 12, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard title="Expenses by Category">
            <div className="h-[360px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={70} outerRadius={110} paddingAngle={4}>
                    {pieData.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend verticalAlign="bottom" wrapperStyle={{ color: '#cbd5e1' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-slate-950/40">
          <h2 className="text-xl font-semibold text-white mb-4">Weekly spending forecast</h2>
          <p className="text-slate-400">Analytics updates dynamically as you add income and expense transactions. Use the filter controls from your Income and Expense sections to refine each chart.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
