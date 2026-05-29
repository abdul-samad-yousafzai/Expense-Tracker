import React, { useEffect, useMemo, useRef, useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import Modal from '../../components/Modal';
import SearchBar from '../../components/SearchBar';
import TransactionCard from '../../components/TransactionCard';
import Loader from '../../components/Loader';
import EmptyState from '../../components/EmptyState';

const categories = [
  { label: 'Food', value: 'Food' },
  { label: 'Shopping', value: 'Shopping' },
  { label: 'Bills', value: 'Bills' },
  { label: 'Travel', value: 'Travel' },
  { label: 'Entertainment', value: 'Entertainment' },
  { label: 'Health', value: 'Health' },
  { label: 'Education', value: 'Education' },
  { label: 'Other', value: 'Other' },
];

const Expense = () => {
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const [items, setItems] = useState([]);
  const formatCurrency = (value) => `Rs ${new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value ?? 0)}`;
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({ title: '', amount: '', category: 'Food', description: '', date: '' });

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/expense');
        setItems(data.data);
      } catch (err) {
        console.error(err);
        toast.error('Unable to load expenses');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filteredItems = useMemo(() => {
    return items
      .filter((item) => (filter === 'All' ? true : item.category === filter))
      .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase()));
  }, [items, filter, search]);

  const resetForm = () => {
    setFormData({ title: '', amount: '', category: 'Food', description: '', date: '' });
    setSelectedItem(null);
    titleRef.current?.focus();
  };

  const openAdd = () => {
    resetForm();
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setSelectedItem(item);
    const itemDate = item.date ? new Date(item.date).toISOString().split('T')[0] : '';
    setFormData({
      title: item.title,
      amount: item.amount.toString(),
      category: item.category,
      description: item.description || '',
      date: itemDate,
    });
    setModalOpen(true);
  };

  const handleDelete = async (itemId) => {
    if (!window.confirm('Delete this expense?')) return;
    try {
      await api.delete(`/expense/${itemId}`);
      setItems((prev) => prev.filter((item) => item._id !== itemId));
      toast.success('Expense deleted');
    } catch (err) {
      console.error(err);
      toast.error('Unable to delete expense');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) {
      return toast.error('Title and amount are required');
    }

    setSaving(true);
    try {
      if (selectedItem) {
        const { data } = await api.put(`/expense/${selectedItem._id}`, {
          ...formData,
          amount: Number(formData.amount),
        });
        setItems((prev) => prev.map((item) => (item._id === selectedItem._id ? data.data : item)));
        toast.success('Expense updated');
      } else {
        const { data } = await api.post('/expense', {
          ...formData,
          amount: Number(formData.amount),
        });
        setItems((prev) => [data.data, ...prev]);
        toast.success('Expense added');
      }
      setModalOpen(false);
      resetForm();
    } catch (err) {
      console.error(err);
      toast.error('Unable to save expense');
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Expense Management</p>
            <h1 className="text-3xl font-semibold text-white">Expenses</h1>
          </div>
          <button
            onClick={openAdd}
            className="inline-flex items-center gap-2 rounded-2xl bg-rose-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-500/20 hover:bg-rose-400"
          >
            <FiPlus /> Add Expense
          </button>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/40">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search expense" />
              <div className="flex flex-wrap gap-3">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none"
                >
                  <option value="All">All categories</option>
                  {categories.map((item) => (
                    <option key={item.value} value={item.value}>{item.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/40">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Expense total</p>
            <p className="mt-3 text-3xl font-semibold text-white">
              {formatCurrency(filteredItems.reduce((sum, item) => sum + item.amount, 0))}
            </p>
            <p className="mt-2 text-sm text-slate-400">Filtered total from {filteredItems.length} records</p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><Loader /></div>
        ) : filteredItems.length ? (
          <div className="grid gap-4 xl:grid-cols-2">
            {filteredItems.map((item) => (
              <TransactionCard
                key={item._id}
                title={item.title}
                category={item.category}
                amount={item.amount}
                date={item.date}
                type="expense"
                onEdit={() => openEdit(item)}
                onDelete={() => handleDelete(item._id)}
              />
            ))}
          </div>
        ) : (
          <EmptyState title="No expenses found" subtitle="Start tracking your spending by adding a new transaction." />
        )}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={selectedItem ? 'Edit Expense' : 'Add Expense'}>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm text-slate-300">
              Title
              <input
                ref={titleRef}
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none"
              />
            </label>
            <label className="block text-sm text-slate-300">
              Amount
              <input
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                type="number"
                step="0.01"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none"
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm text-slate-300">
              Category
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>{category.label}</option>
                ))}
              </select>
            </label>
            <label className="block text-sm text-slate-300">
              Date
              <input
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                type="date"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none"
              />
            </label>
          </div>

          <label className="block text-sm text-slate-300">
            Description
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none"
            />
          </label>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="rounded-2xl border border-white/10 px-5 py-3 text-sm text-slate-300 hover:bg-white/5">
              Cancel
            </button>
            <button type="submit" className="rounded-2xl bg-rose-500 px-5 py-3 text-sm font-semibold text-white hover:bg-rose-400 disabled:opacity-60" disabled={saving}>
              {saving ? 'Saving...' : selectedItem ? 'Update expense' : 'Add expense'}
            </button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default Expense;