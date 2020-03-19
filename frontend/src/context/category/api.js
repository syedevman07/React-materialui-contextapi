import Axios from '../../utils/axios';

export const getCategories = async () => 
  Axios({
      method: 'GET',
      url: '/category/',
  });

export const getSubCategories = async () => 
  Axios({
      method: 'GET',
      url: '/sub-category/',
  });
