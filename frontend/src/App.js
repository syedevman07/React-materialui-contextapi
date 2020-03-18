import React from 'react';
import { Switch, Route } from 'react-router';

import routes from './routes';
import MainLayout from './components/Layout';

function App() {
  return (
    <MainLayout>
      <Switch>
        {routes.map((props, i) => 
        <Route key={i} {...props}/>)}
      </Switch>
    </MainLayout>
  );
}

export default App;
