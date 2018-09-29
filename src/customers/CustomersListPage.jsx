import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CustomersList } from './CustomersList';
import { FilterBox } from './FilterBox';
import { CustomerDetails } from './CustomerDetails';

export class CustomersListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterText: '',
      selectedCustomerId: undefined
    };
  }

  changeFilter = (filterText) => this.setState(() => ({ filterText }));

  selectCustomer = (customerId) => this.setState(() => ({ selectedCustomerId: customerId }));

  deselectCustomer = () => this.setState(() => ({ selectedCustomerId: undefined }));

  render() {
    const { customers } = this.props;
    const { filterText, selectedCustomerId } = this.state;

    const filteredCustomers = customers.filter(customer => Object.values(customer).some(customerValue => customerValue.includes(filterText)));
    return (
      <div>
        <FilterBox value={filterText} onChange={this.changeFilter} />
        <CustomersList customers={filteredCustomers} onCustomerSelected={this.selectCustomer} />
        <CustomerDetails customer={filteredCustomers.find(customer => customer.id === selectedCustomerId)} deselectCustomer={this.deselectCustomer} />
      </div>
    );
  }
}

CustomersListPage.propTypes = {
  customers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      status: PropTypes.string,
      createdAt: PropTypes.string,
      name: PropTypes.string,
      phone: PropTypes.string
    })
  ).isRequired
};
