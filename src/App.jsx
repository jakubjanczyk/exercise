import './app.pcss';
import React from 'react';
import { hot } from 'react-hot-loader';
import 'react-table/react-table.css';
import { CustomersListPage } from './customers/CustomersListPage';

const App = () => (
  <CustomersListPage customers={[
    {
      id: '123', status: 'prospective', createdAt: '2018-09-23 16:11:30', name: 'Jane Doe', phone: '+48234872923'
    },
    {
      id: '234', status: 'current', createdAt: '2018-09-20 12:15:30', name: 'John Doe', phone: '+48345213976'
    }
  ]}
  />
);

export default hot(module)(App);
