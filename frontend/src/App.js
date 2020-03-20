import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import { commonRoutes, authRoutes, noAuthRoutes, adminRoutes } from './routes';
import MainLayout from './components/Layout';
import { useUser } from './context/user';

function App() {
  const { methods: { isLoggedIn, isAdmin }, data } = useUser();
  console.log("isAdmin, isLoggedIn", isAdmin(), isLoggedIn(), data)
  const getRoutes = () => {
    if(isAdmin()) {
      return adminRoutes.concat(authRoutes).concat(commonRoutes);
    }
    if(isLoggedIn()) {
      return authRoutes.concat(commonRoutes);
    }
    return noAuthRoutes.concat(commonRoutes);
  }
  return (
    <MainLayout>
      <Switch>
        {getRoutes().map((props, i) => 
        <Route key={i} {...props}/>)}
        {/* <Route path="">
          <Redirect to="/" />
        </Route> */}
      </Switch>
    </MainLayout>
  );
}

export default App;
