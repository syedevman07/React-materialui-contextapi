import Axios from '../../utils/axios';

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
}
