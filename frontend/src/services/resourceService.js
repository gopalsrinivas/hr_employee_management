import apiClient from "./apiClient";

const cleanParams = (params = {}) =>
  Object.fromEntries(Object.entries(params).filter(([, value]) => value !== "" && value !== undefined && value !== null));

export const listResource = async (endpoint, params) => {
  const response = await apiClient.get(endpoint, { params: cleanParams(params) });
  const pagination = response.data.pagination || {};
  return {
    records: response.data.data || [],
    pagination: {
      page: pagination.page || 1,
      limit: pagination.limit || 10,
      total: pagination.total ?? pagination.totalRecords ?? 0,
      totalRecords: pagination.totalRecords ?? pagination.total ?? 0,
      totalPages: pagination.totalPages || 1
    }
  };
};

export const getResource = async (endpoint, id) => {
  const response = await apiClient.get(`${endpoint}/${id}`);
  return response.data.data;
};

export const createResource = async (endpoint, payload, options) => {
  const response = await apiClient.post(endpoint, payload, options);
  return response.data.data;
};

export const updateResource = async (endpoint, id, payload, method = "put") => {
  const response = await apiClient[method](`${endpoint}/${id}`, payload);
  return response.data.data;
};

export const deleteResource = async (endpoint, id) => {
  const response = await apiClient.delete(`${endpoint}/${id}`);
  return response.data;
};

export const runAction = async (path, payload = {}) => {
  const response = await apiClient.patch(path, payload);
  return response.data.data;
};
