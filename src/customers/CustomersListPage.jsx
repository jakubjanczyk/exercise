import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CustomersList } from './CustomersList';
import { FilterBox } from './FilterBox';

export class CustomersListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterText: ''
    };
  }

  changeFilter = (filterText) => this.setState(() => ({ filterText }));

  render() {
    const { customers } = this.props;
    const { filterText } = this.state;

    const filteredCustomers = customers.filter(customer => Object.values(customer).some(customerValue => customerValue.includes(filterText)));
    return (
      <div>
        <FilterBox value={filterText} onChange={this.changeFilter} />
        <CustomersList customers={filteredCustomers} />
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
