import React from 'react';
import { HashRouter } from 'react-router-dom';

import GlobalStyle from '~/styles/globals';

import Routes from './routes';

const App: React.FC = () => (
  <>
    <HashRouter>
      <Routes />
    </HashRouter>
    <GlobalStyle />
  </>
);

export default App;
