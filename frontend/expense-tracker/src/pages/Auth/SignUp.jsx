import React, { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader';

const SignUp = () => {
  const { register, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const nameRef = useRef(null);

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  useEffect(() => {
    if (token) navigate('/dashboard');
  }, [token, navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      return toast.error('Please complete all fields');
    }
    if (form.password !== form.confirmPassword) {
      return toast.error('Passwords must match');
    }
    if (form.password.length < 6) {
      return toast.error('Password must be at least 6 characters');
    }

    setLoading(true);
    try {
      await register({ name: form.name, email: form.email, password: form.password });
      toast.success('Account created successfully');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Unable to register');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-900/40 backdrop-blur-xl">
        <div className="mb-6 space-y-2">
          <p className="text-sm uppercase tracking-[0.25em] text-indigo-300">Expense Tracker Pro</p>
          <h1 className="text-3xl font-semibold">Create your account</h1>
          <p className="text-sm text-slate-400">Secure onboarding with encrypted credentials.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-sm text-slate-300">Full Name</label>
            <input
              ref={nameRef}
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-indigo-400"
              placeholder="Jane Doe"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-slate-300">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-indigo-400"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-slate-300">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-indigo-400"
              placeholder="Create a password"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-slate-300">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-indigo-400"
              placeholder="Re-enter password"
            />
          </div>

          <button
            type="submit"
            className="flex h-12 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 text-base font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:brightness-110 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? <Loader /> : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-300 hover:text-white">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;