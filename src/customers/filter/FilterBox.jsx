import React from 'react';
import PropTypes from 'prop-types';
import styles from './filter-box.pcss';

export const FilterBox = ({ value, onChange }) => (
  <div className={styles.container} data-test="filter-box">
    <input className={styles.input} data-test="filter-box-input" value={value} onChange={(event) => onChange(event.target.value)} placeholder="Filter Customers" />
  </div>
);

FilterBox.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
