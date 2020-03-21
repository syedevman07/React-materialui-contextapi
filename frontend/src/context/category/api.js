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
