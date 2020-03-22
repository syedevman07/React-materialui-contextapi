import Axios from '../../utils/axios';
import ROLE from '../../utils/constants/role';

export const getUsers = async ({ page, search, category, subCategory, role }) => {
    const params = {
        offset: page * 10,
        search,
    };
    if (role && role !== 0) params.role = role;
    if (category && category !== 0) params.category = category;
    if (subCategory && subCategory !== 0) params.sub_category = subCategory;
    return Axios({
        method: 'GET',
        url: '/users/',
        params,
    });
};

export const createUser = async(payload) => {
  const { firstName, lastName, email, role, password, category, subCategory, country, city} = payload;
  let data = {
    first_name: firstName,
    last_name: lastName,
    email,
    password,
    role,
    country,
    category,
    sub_category: subCategory,
    city,
  };

  return Axios({
    method: 'POST',
    url: '/users/',
    data,
  }, true)
}

export const login = async data => Axios({
  method: 'POST',
  url: '/token/',
  data,
});

export const getProfile = async data => Axios({
  method: 'GET',
  url: '/profile/',
  data,
}, true)

export const sendEnquiry = async (owner, content) => Axios({
  method: 'POST',
  url: '/enquiries/',
  data: {
    owner,
    content,
  },
}, false);


export const getUser = async id => Axios({
  method: 'GET',
  url: `/users/${id}/`,
  data: { id },
});

export const updateProfile = async payload => {
  if (payload.sub_category == 0) {
    payload.sub_category = null;
  }
  if (payload.category == 0) {
    payload.category = null;
  }
  return Axios({
  method: 'PATCH',
  url: `/profile/`,
  data: payload,
}, true)
};