import React, { createContext, useEffect, useState, useCallback } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const loadProfile = useCallback(async () => {
    if (!token) return;
    try {
      const { data } = await api.get('/auth/profile');
      setUser(data?.data || null);
    } catch (err) {
      console.error('Failed to load profile', err);
      setUser(null);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      loadProfile();
    } else {
      localStorage.removeItem('token');
      setUser(null);
    }
  }, [token, loadProfile]);

  const login = async (credentials) => {
    const { data } = await api.post('/auth/login', credentials);
    setToken(data?.data?.token);
    return data;
  };

  const register = async (payload) => {
    const { data } = await api.post('/auth/register', payload);
    setToken(data?.data?.token);
    return data;
  };

  const updateProfile = async (payload) => {
    const { data } = await api.put('/auth/profile', payload);
    setUser(data?.data?.user || null);
    return data;
  };

  const updatePassword = async (payload) => {
    const { data } = await api.put('/auth/profile/password', payload);
    return data;
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, updateProfile, updatePassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
