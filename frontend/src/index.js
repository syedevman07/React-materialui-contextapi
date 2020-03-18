import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from "history";

import ContextProvider from './context';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const Main = () => {
  const history = createBrowserHistory();

  return (
    <ContextProvider>
      {/* <ThemeProvider theme={theme}> */}
        <Router history={history}>
          {/* <HelmetProvider> */}
            <App />
          {/* </HelmetProvider> */}
        </Router>
      {/* </ThemeProvider> */}
    </ContextProvider>
  );
};

ReactDOM.render(<Main />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
