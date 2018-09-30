import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CustomersList } from './CustomersList';
import { FilterBox } from './FilterBox';
import { CustomerDetails } from './CustomerDetails';
import { withCustomersFetch } from './withCustomersFetch';
import { withCustomerUpdate } from './withCustomerUpdate';

class CustomersListPageComponent extends Component {
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

  changeCustomer = (customer) => this.props.updateCustomer(customer).then(this.props.fetchCustomers);

  render() {
    const { customers } = this.props;
    const { filterText, selectedCustomerId } = this.state;

    const filteredCustomers = customers.filter(customer => Object.values(customer).some(customerValue => customerValue.includes(filterText)));
    const selectedCustomer = filteredCustomers.find(customer => customer.id === selectedCustomerId);
    return (
      <div>
        <FilterBox value={filterText} onChange={this.changeFilter} />
        <CustomersList customers={filteredCustomers} onCustomerSelected={this.selectCustomer} />
        {
          selectedCustomerId
          && (
            <CustomerDetails
              key={selectedCustomer}
              customer={selectedCustomer}
              deselectCustomer={this.deselectCustomer}
              changeCustomer={this.changeCustomer}
            />
          )
        }
      </div>
    );
  }
}

CustomersListPageComponent.propTypes = {
  customers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      status: PropTypes.string,
      createdAt: PropTypes.string,
      name: PropTypes.string,
      phone: PropTypes.string,
      notes: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
          id: PropTypes.string.isRequired
        })
      ).isRequired
    })
  ).isRequired,
  fetchCustomers: PropTypes.func.isRequired,
  updateCustomer: PropTypes.func.isRequired,
};

export const CustomersListPage = withCustomersFetch(withCustomerUpdate(CustomersListPageComponent));
