import React, { useReducer, useContext } from 'react';
import Context, { initialState } from './context';
import reducer from './reducer';
import { getCategories, getSubCategories } from './actions';

const CategoryContextProvider = ({
    children,
    initialContext = initialState,
}) => {
    const [state, dispatch] = useReducer(reducer, initialContext);

    return (
        <Context.Provider
            value={{
                data: state,
                methods: {
                    getCategories: getCategories(dispatch),
                    getSubCategories: getSubCategories(dispatch)
                },
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useCategory = () => useContext(Context);

export default CategoryContextProvider;