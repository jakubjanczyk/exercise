import React from 'react';
import PropTypes from 'prop-types';

export const FilterBox = ({ value, onChange }) => (
  <div data-test="filter-box">
    <input data-test="filter-box-input" value={value} onChange={(event) => onChange(event.target.value)} placeholder="Filter..." />
  </div>
);

FilterBox.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
