import * as ReactDOM from 'react-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './customer-details.pcss';
import { Notes } from '../notes/Notes';

export class CustomerDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customer: props.customer
    };
  }

  updateStatus = (event) => {
    const newStatus = event.target.value;
    this.setState((prevState) => ({
      customer: {
        ...prevState.customer,
        status: newStatus
      }
    }));
  };

  onConfirm = () => this.props.changeCustomer(this.state.customer);

  updateNotes = (notes) => {
    const newCustomer = {
      ...this.state.customer,
      notes
    };
    this.props.changeCustomer(newCustomer)
      .then(() => this.setState(() => ({ customer: newCustomer })));
  };

  render() {
    const { deselectCustomer } = this.props;
    const { customer } = this.state;

    const confirmButtonEnabled = this.state.customer.status !== this.props.customer.status;
    return (
      ReactDOM.createPortal(
        <div className={styles.container} data-test="customer-details">
          <div className={styles.box}>
            <div className={styles.boxHeader}>
              <button data-test="back-button" className={styles.backButton} onClick={deselectCustomer} type="button">
                <span>&#8592;</span> <span>Back To List</span>
              </button>
              <span className={styles.headerTitle}>Customer Details</span>
            </div>
            <div className={styles.boxContent}>
              <div>
                <div data-test="customer-id" className={styles.dataItem}>
                  <div className={styles.label}>ID:</div>
                  <div data-test="value">{customer.id}</div>
                </div>
                <div data-test="customer-created-at" className={styles.dataItem}>
                  <div className={styles.label}>Created At:</div>
                  <div data-test="value">{customer.createdAt}</div>
                </div>
                <div data-test="customer-name" className={styles.dataItem}>
                  <div className={styles.label}>Name:</div>
                  <div data-test="value">{customer.name}</div>
                </div>
                <div data-test="customer-phone" className={styles.dataItem}>
                  <div className={styles.label}>Phone:</div>
                  <div data-test="value">{customer.phone}</div>
                </div>
                <div data-test="customer-status" className={styles.dataItem}>
                  <div className={styles.label}>Status:</div>
                  <div className={styles.statusSelectContainer}>
                    <select
                      className={styles.statusSelect}
                      data-test="value"
                      value={customer.status}
                      onChange={this.updateStatus}
                    >
                      <option value="current">current</option>
                      <option value="prospective">prospective</option>
                      <option value="non-active">non-active</option>
                    </select>
                    {
                      confirmButtonEnabled
                      && (
                        <button
                          type="button"
                          className={styles.confirmButton}
                          data-test="customer-confirm-button"
                          onClick={this.onConfirm}
                        >
                          Change
                        </button>
                      )
                    }
                  </div>
                </div>

              </div>
              <Notes notes={this.state.customer.notes} updateNotes={this.updateNotes} />
            </div>
          </div>
        </div>,
        document.getElementsByTagName('body')[0]
      )
    );
  }
}

CustomerDetails.propTypes = {
  customer: PropTypes.shape({
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
  }).isRequired,
  deselectCustomer: PropTypes.func.isRequired,
  changeCustomer: PropTypes.func.isRequired
};
