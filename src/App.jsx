import './app.pcss';
import React from 'react';
import { hot } from 'react-hot-loader';
import 'react-table/react-table.css';
import { CustomersPage } from './customers/CustomersPage';

const App = () => (
  <CustomersPage />
);

export default process.env.NODE_ENV === 'production' ? App : hot(module)(App);
