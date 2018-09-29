import * as ReactDOM from 'react-dom';
import React, { Component } from 'react';
import styles from './customer-details.pcss';
import * as PropTypes from 'prop-types';

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

  render() {
    const { deselectCustomer } = this.props;
    const { customer } = this.state;

    return (
      ReactDOM.createPortal(
        <div className={styles.container} data-test="customer-details">
          <div className={styles.box}>
            <button data-test="back-button" onClick={deselectCustomer} type="button">Back To List</button>
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
                <select data-test="value" value={customer.status} onChange={this.updateStatus}>
                  <option value="current">current</option>
                  <option value="prospective">prospective</option>
                  <option value="non-active">non-active</option>
                </select>
              </div>
              <button
                type="button"
                data-test="customer-confirm-button"
                onClick={this.onConfirm}
                disabled={this.state.customer.status === this.props.customer.status}
              >
                Confirm
              </button>
            </div>
            <div data-test="customer-notes">
              {
                customer.notes.map((note) => (
                  <div data-test="customer-note" key={note.created}>
                    <div data-test="customer-note-text">
                      {note.text}
                    </div>
                    <div data-test="customer-note-date">
                      Created at: {note.created}
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>,
        document.getElementsByTagName('body')[0]
      )
    );
  }
}

CustomerDetails.propTypes = {
  customer: PropTypes.shape().isRequired,
  deselectCustomer: PropTypes.func.isRequired,
  changeCustomer: PropTypes.func.isRequired
};
