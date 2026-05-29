import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './routes/ProtectedRoute';
import Loader from './components/Loader';

const Login = lazy(() => import('./pages/Auth/Login'));
const SignUp = lazy(() => import('./pages/Auth/SignUp'));
const Home = lazy(() => import('./pages/Dashboard/Home'));
const Income = lazy(() => import('./pages/Dashboard/Income'));
const Expense = lazy(() => import('./pages/Dashboard/Expense'));
const Analytics = lazy(() => import('./pages/Dashboard/Analytics'));
const Profile = lazy(() => import('./pages/Dashboard/Profile'));

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Suspense
            fallback={
              <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <Loader />
              </div>
            }
          >
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/dashboard" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/income" element={<ProtectedRoute><Income /></ProtectedRoute>} />
              <Route path="/expense" element={<ProtectedRoute><Expense /></ProtectedRoute>} />
              <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;