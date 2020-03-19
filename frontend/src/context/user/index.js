import React, { useReducer, useContext } from 'react';
import Context, { initialState } from './context';
import reducer from './reducer';
import { getUsers, createUser } from './actions';

const UserContextProvider = ({
    children,
    initialContext = initialState,
}) => {
    const [state, dispatch] = useReducer(reducer, initialContext);

    return (
        <Context.Provider
            value={{
                data: state,
                methods: {
                    getUsers: getUsers(dispatch),
                    createUser: createUser(dispatch)
                },
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useUser = () => useContext(Context);

export default UserContextProvider;