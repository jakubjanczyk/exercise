import './app.pcss';
import React from 'react';
import { hot } from 'react-hot-loader';
import 'react-table/react-table.css';
import { CustomersPage } from './customers/CustomersPage';

const App = () => (
  <CustomersPage />
);

export default hot(module)(App);
