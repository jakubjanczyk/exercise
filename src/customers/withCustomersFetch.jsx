import React from 'react';
import axios from 'axios';

export const withCustomersFetch = (WrappedComponent) =>
  class CustomersFetch extends React.Component {
    state = {
      customers: []
    };

    componentDidMount() {
      this.fetchCustomers();
    }

    fetchCustomers = () => axios.get(`${process.env.BASE_URL}/customers`)
      .then(({ data }) => this.setState(() => ({ customers: data })));

    render() {
      const { customers } = this.state;
      return <WrappedComponent {...this.props} customers={customers} fetchCustomers={this.fetchCustomers} />;
    }
  };
