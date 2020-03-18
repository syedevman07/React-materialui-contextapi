import Axios from '../../utils/axios';

export const getUsers = async ({ page, search, category, subCategory, role }) => {
    const params = {
        offset: page * 10,
        search,
    };
    if (role) params.role = role;
    if (category) params.category = category;
    if (subCategory) params.sub_category = subCategory;
    return Axios({
        method: 'GET',
        url: '/users/',
        params,
    });
}
