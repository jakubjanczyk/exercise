import * as ReactDOM from 'react-dom';
import React from 'react';
import styles from './customer-details.pcss';

export const CustomerDetails = ({customer, deselectCustomer}) => {
  if (!customer) {
    return null;
  }
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
              <div data-test="value">{customer.status}</div>
            </div>
          </div>
        </div>
      </div>,
      document.getElementsByTagName('body')[0]
    )
  );
};
