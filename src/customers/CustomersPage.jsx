import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withCustomersFetch } from './withCustomersFetch';
import { withCustomerUpdate } from './withCustomerUpdate';
import { CustomerDetails } from './details/CustomerDetails';
import { FilterBox } from './filter/FilterBox';
import { CustomersList } from './list/CustomersList';
import styles from './customers-page.pcss';

class CustomersPageComponent extends Component {
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

    const filteredCustomers = customers.filter(customer => Object.values(customer)
      .some(customerValue => typeof customerValue === 'string' && customerValue.toLowerCase().includes(filterText.toLowerCase())));
    const selectedCustomer = filteredCustomers.find(customer => customer.id === selectedCustomerId);
    return (
      <main className={styles.page}>
        <h1 className={styles.header}>Customers</h1>
        <FilterBox value={filterText} onChange={this.changeFilter} />
        <CustomersList customers={filteredCustomers} onCustomerSelected={this.selectCustomer} />
        {
          selectedCustomerId
          && (
            <CustomerDetails
              key={selectedCustomerId}
              customer={selectedCustomer}
              deselectCustomer={this.deselectCustomer}
              changeCustomer={this.changeCustomer}
            />
          )
        }
      </main>
    );
  }
}

CustomersPageComponent.propTypes = {
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

export const CustomersPage = withCustomersFetch(withCustomerUpdate(CustomersPageComponent));
