import React, { useReducer, useContext } from 'react';
import Context, { initialState } from './context';
import reducer from './reducer';
import { getUsers } from './actions';

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
                    getUsers: getUsers(dispatch)
                },
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useUsers = () => useContext(Context);

export default UserContextProvider;