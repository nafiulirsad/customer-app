// frontend/lib/api.ts

import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Ambil data customer dengan pagination
export const getCustomers = async (page = 1, limit = 50) => {
  const res = await axios.get(`${API_URL}/customers?page=${page}&limit=${limit}`);
  return res.data;
};

export const getGenderStats = async () => {
  const res = await axios.get(`${API_URL}/gender-stats`);
  return res.data;
};

export const getLocationTypeStats = async () => {
  const res = await axios.get(`${API_URL}/location-type-stats`);
  return res.data;
};

export const getDigitalInterestStats = async () => {
  const res = await axios.get(`${API_URL}/digital-interest-stats`);
  return res.data;
};

export const getDeviceBrandStats = async () => {
  const res = await axios.get(`${API_URL}/device-brand-stats`);
  return res.data;
};

export const getAgeDistribution = async () => {
  const res = await axios.get(`${API_URL}/age-distribution`);
  return res.data;
};