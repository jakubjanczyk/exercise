import React from 'react';
import { CustomersList } from './CustomersList';
import { wrapperForCustomersList } from './customers-list-test-wrapper';
import { mountWithCustomWrappers } from '../../test-utils/custom-wrappers';

describe('CustomersList', () => {
  it('should render table with necessary columns', () => {
    const component = mountComponent();

    expect(component.customersTableColumns()).toEqual(['ID', 'Status', 'Created at', 'Name', 'Phone']);
  });

  it('should render row for a customer', () => {
    const component = mountComponent([
      {
        id: '123', status: 'prospective', createdAt: '2018-09-23 16:11:30', name: 'Jane Doe', phone: '+48234872923'
      }
    ]);

    expect(component.customersTableRowAt(0)).toEqual(['123', 'prospective', '2018-09-23 16:11:30', 'Jane Doe', '+48234872923']);
  });

  it('should render rows for multiple customers', () => {
    const component = mountComponent([
      {
        id: '123', status: 'prospective', createdAt: '2018-09-23 16:11:30', name: 'Jane Doe', phone: '+48234872923'
      },
      {
        id: '234', status: 'current', createdAt: '2018-09-20 12:15:30', name: 'John Doe', phone: '+48345213976'
      }
    ]);

    expect(component.numberOfCustomerRows()).toEqual(2);
    expect(component.customersTableRowAt(0)).toEqual(['123', 'prospective', '2018-09-23 16:11:30', 'Jane Doe', '+48234872923']);
    expect(component.customersTableRowAt(1)).toEqual(['234', 'current', '2018-09-20 12:15:30', 'John Doe', '+48345213976']);
  });

  it('should allow to sort table by any column ascending', () => {
    const customers = [
      {
        id: '123', status: 'prospective', createdAt: '2018-09-23 16:11:30', name: 'Jane Doe', phone: '+48234872923'
      },
      {
        id: '234', status: 'current', createdAt: '2018-09-20 12:15:30', name: 'John Doe', phone: '+48345213976'
      }
    ];
    const component = mountComponent(customers);

    component.clickOnColumnHeader('Status');

    expect(component.customersTableRowAt(0)).toEqual(['234', 'current', '2018-09-20 12:15:30', 'John Doe', '+48345213976']);
    expect(component.customersTableRowAt(1)).toEqual(['123', 'prospective', '2018-09-23 16:11:30', 'Jane Doe', '+48234872923']);
  });

  it('should allow to sort table by any column descending', () => {
    const customers = [
      {
        id: '123', status: 'prospective', createdAt: '2018-09-23 16:11:30', name: 'Jane Doe', phone: '+48234872923'
      },
      {
        id: '234', status: 'current', createdAt: '2018-09-20 12:15:30', name: 'John Doe', phone: '+48345213976'
      }
    ];
    const component = mountComponent(customers);

    component.clickOnColumnHeader('Status');
    component.clickOnColumnHeader('Status');

    expect(component.customersTableRowAt(0)).toEqual(['123', 'prospective', '2018-09-23 16:11:30', 'Jane Doe', '+48234872923']);
    expect(component.customersTableRowAt(1)).toEqual(['234', 'current', '2018-09-20 12:15:30', 'John Doe', '+48345213976']);
  });

  const mountComponent = (customers = []) =>
    mountWithCustomWrappers(<CustomersList customers={customers} />, wrapperForCustomersList);
});
