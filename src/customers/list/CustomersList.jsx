import React from 'react';
import ReactTable from 'react-table';
import PropTypes from 'prop-types';
import styles from './customers-list.pcss';

const columns = [
  {
    Header: 'ID',
    id: 'id',
    accessor: 'id',
    resizable: false
  },
  {
    Header: 'Name',
    id: 'name',
    accessor: 'name',
    resizable: false
  },
  {
    Header: 'Status',
    id: 'status',
    accessor: 'status',
    resizable: false
  },
  {
    Header: 'Phone',
    id: 'phone',
    accessor: 'phone',
    resizable: false
  },
  {
    Header: 'Created at',
    id: 'createdAt',
    accessor: 'createdAt',
    resizable: false
  }
];

export const CustomersList = (props) => {
  const { customers } = props;

  return (
    <div className={styles.customersList} data-test="customers-list">
      <ReactTable
        getTrProps={(state, rowInfo) => ({ onClick: () => props.onCustomerSelected(rowInfo.original.id) })}
        data={customers}
        columns={columns}
        showPagination={customers.length > 25}
        defaultPageSize={25}
        pageSizeOptions={[25, 50, 100]}
        minRows={0}
        noDataText="No matching customers"
      />
    </div>
  );
};

CustomersList.propTypes = {
  customers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      status: PropTypes.string,
      createdAt: PropTypes.string,
      name: PropTypes.string,
      phone: PropTypes.string
    })
  ).isRequired,
  onCustomerSelected: PropTypes.func
};

CustomersList.defaultProps = {
  onCustomerSelected: () => null
};
