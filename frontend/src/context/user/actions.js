import * as API from './api';

export const GET_USERS = 'GET_USERS';

export const getUsers = dispatch => async (params) => {
    const res = await API.getUsers(params);
    dispatch({
        type: GET_USERS,
        payload: { ...res.data, ...params },
    })
}
