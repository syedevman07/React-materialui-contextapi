import React from 'react';
import { Switch, Route } from 'react-router';

import routes from './routes';

function App() {
  return (
    <>
      <Switch>
        {routes.map((props, i) => 
        <Route key={i} {...props}/>)}
      </Switch>
    </>
  );
}

export default App;
