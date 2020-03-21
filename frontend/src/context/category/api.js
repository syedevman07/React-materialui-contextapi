import Axios from '../../utils/axios';

export const getCategories = async () => 
  Axios({
      method: 'GET',
      url: '/category/',
  });

export const updateCategory = async (id, name) =>
  Axios({
    method: 'PUT',
    url: `/category/${id}/`,
    data: {
      name,
    }
  }, true);

export const getSubCategories = async () => 
  Axios({
      method: 'GET',
      url: '/sub-category/',
  });

export const deleteCategory = async (id) => 
  Axios({
      method: 'DELETE',
      url: `/category/${id}/`,
  }, true);

export const createCategory = async (name) => 
  Axios({
      method: 'POST',
      url: `/category/`,
      data: {
        name
      }
  }, true);