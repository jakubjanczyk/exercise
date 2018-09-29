import React from 'react';
import axios from 'axios';

const updateCustomer = (customer) => axios.put(`${process.env.BASE_URL}/customers/${customer.id}`, customer);

export const withCustomerUpdate = (WrappedComponent) => (props) => <WrappedComponent {...props} updateCustomer={updateCustomer} />;
