import React, { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader';

const Login = () => {
  const { login, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const emailRef = useRef(null);

  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  useEffect(() => {
    if (token) navigate('/dashboard');
  }, [token, navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      return toast.error('Please fill in all fields');
    }

    setLoading(true);
    try {
      await login({ email: form.email, password: form.password });
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Unable to login');
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
          <h1 className="text-3xl font-semibold">Sign in to your account</h1>
          <p className="text-sm text-slate-400">Secure login with fast access to your dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-sm text-slate-300">Email</label>
            <input
              ref={emailRef}
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
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="flex h-12 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 text-base font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:brightness-110 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? <Loader /> : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-indigo-300 hover:text-white">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;