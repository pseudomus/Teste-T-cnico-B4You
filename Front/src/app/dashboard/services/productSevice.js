import axios from '@/lib/axios';

export const getAllProducts = () => axios.get('/api/products/getAll');
export const getProductById = (id) => axios.get(`/api/products/${id}`);
export const createProduct = (data) => axios.post('/api/products', data);
export const updateProduct = (id, data) => axios.put(`/api/products/${id}`, data);
export const deleteProductById = (id) => axios.delete(`/api/products/${id}`);
export const toggleProductBought = (id) => axios.patch(`/api/products/${id}/bought`);
