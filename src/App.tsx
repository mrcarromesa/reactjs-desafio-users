import React from 'react';
import { HashRouter } from 'react-router-dom';

import GlobalStyle from '~/styles/globals';

import Routes from './routes';

const App: React.FC = () => (
  <>
    <HashRouter basename="/reactjs-desafio-users">
      <Routes />
    </HashRouter>
    <GlobalStyle />
  </>
);

export default App;
