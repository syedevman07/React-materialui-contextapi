import React from 'react';
import UserProvider from './user'
import { initialState as User } from './user/context';

export const initialState = {
  User,
};

const RootContextProvider = ({ children, initialContext = initialState }) => (
    <UserProvider initialContext={initialContext.User}>
        {children}
    </UserProvider>
);

export default RootContextProvider;
