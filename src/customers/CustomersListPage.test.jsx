import React from 'react';
import { mountWithCustomWrappers } from '../test-utils/custom-wrappers';
import { wrapperForCustomersList } from './customers-list-test-wrapper';
import { CustomersListPage } from './CustomersListPage';
import { wrapperForCustomersListPage } from './customers-list-page-test-wrapper';
import { wrapperForCustomersDetails } from './customer-details-test-wrapper';

describe('CustomersListPage', () => {
  const customers = [
    {
      id: '123', status: 'prospective', createdAt: '2018-09-23 16:11:30', name: 'Jane Doe', phone: '+48234872923'
    },
    {
      id: '234', status: 'current', createdAt: '2018-09-20 12:15:30', name: 'John Doe', phone: '+48345213976'
    },
    {
      id: '345', status: 'prospective', createdAt: '2018-09-26 12:15:30', name: 'John Smith', phone: '+48345213333'
    },
    {
      id: '456', status: 'non-active', createdAt: '2018-09-18 12:15:30', name: 'Amy Smith', phone: '+48333444555'
    }
  ];

  it('should display list of customers', () => {
    const component = mountPage();

    expect(component.customersRows()).toEqual([
      ['123', 'prospective', '2018-09-23 16:11:30', 'Jane Doe', '+48234872923'],
      ['234', 'current', '2018-09-20 12:15:30', 'John Doe', '+48345213976'],
      ['345', 'prospective', '2018-09-26 12:15:30', 'John Smith', '+48345213333'],
      ['456', 'non-active', '2018-09-18 12:15:30', 'Amy Smith', '+48333444555']
    ]);
  });

  describe('filtering', () => {
    it('should allow to filter list of customers by ID', () => {
      const component = mountPage();

      component.typeFilterText('456');

      expect(component.customersRows()).toEqual([
        ['456', 'non-active', '2018-09-18 12:15:30', 'Amy Smith', '+48333444555']
      ]);
    });

    it('should allow to filter list of customers by status', () => {
      const component = mountPage();

      component.typeFilterText('prospective');

      expect(component.customersRows()).toEqual([
        ['123', 'prospective', '2018-09-23 16:11:30', 'Jane Doe', '+48234872923'],
        ['345', 'prospective', '2018-09-26 12:15:30', 'John Smith', '+48345213333'],
      ]);
    });

    it('should allow to filter list of customers by date', () => {
      const component = mountPage();

      component.typeFilterText('09-23');

      expect(component.customersRows()).toEqual([
        ['123', 'prospective', '2018-09-23 16:11:30', 'Jane Doe', '+48234872923'],
      ]);
    });

    it('should allow to filter list of customers by name', () => {
      const component = mountPage();

      component.typeFilterText('Doe');

      expect(component.customersRows()).toEqual([
        ['123', 'prospective', '2018-09-23 16:11:30', 'Jane Doe', '+48234872923'],
        ['234', 'current', '2018-09-20 12:15:30', 'John Doe', '+48345213976']
      ]);
    });

    it('should allow to filter list of customers by phone number', () => {
      const component = mountPage();

      component.typeFilterText('+48234872');

      expect(component.customersRows()).toEqual([
        ['123', 'prospective', '2018-09-23 16:11:30', 'Jane Doe', '+48234872923']
      ]);
    });

    it('should allow to filter list of customers by multiple fields', () => {
      const component = mountPage();

      component.typeFilterText('234');

      expect(component.customersRows()).toEqual([
        ['123', 'prospective', '2018-09-23 16:11:30', 'Jane Doe', '+48234872923'],
        ['234', 'current', '2018-09-20 12:15:30', 'John Doe', '+48345213976']
      ]);
    });

    it('should keep sorting when filtering', () => {
      const component = mountPage();

      component.clickOnColumnHeader('Name');
      component.clickOnColumnHeader('Name');
      component.typeFilterText('prospective');

      expect(component.customersRows()).toEqual([
        ['345', 'prospective', '2018-09-26 12:15:30', 'John Smith', '+48345213333'],
        ['123', 'prospective', '2018-09-23 16:11:30', 'Jane Doe', '+48234872923'],
      ]);
    });

    describe('customer details', () => {
      it('should not open customer details by default', () => {
        const component = mountPage();

        expect(component.customerDetailsComponent()).not.toExist();
      });

      it('should open customer details when clicked on customer', () => {
        const component = mountPage();

        component.clickOnCustomerAtRow(0);

        expect(component.customerDetailsComponent()).toExist();
      });

      it('should close customer details when clicked on back button', () => {
        const component = mountPage();

        component.clickOnCustomerAtRow(0);
        component.goBackToList();

        expect(component.customerDetailsComponent()).not.toExist();
      });

      it('should display all basic customer details', () => {
        const component = mountPage();

        component.clickOnCustomerAtRow(0);

        expect(component.customerDetailsId()).toEqual('123');
        expect(component.customerDetailsName()).toEqual('Jane Doe');
        expect(component.customerDetailsCreatedAt()).toEqual('2018-09-23 16:11:30');
        expect(component.customerDetailsPhone()).toEqual('+48234872923');
        expect(component.customerDetailsStatus()).toEqual('prospective');
      });

      it('should open one customer, close, open another one with new data', () => {
        const component = mountPage();

        component.clickOnCustomerAtRow(0);
        component.goBackToList();
        component.clickOnCustomerAtRow(1);

        expect(component.customerDetailsId()).toEqual('234');
      });
    });
  });

  const mountPage = () => mountWithCustomWrappers(
    <CustomersListPage customers={customers} />,
    wrapperForCustomersList,
    wrapperForCustomersListPage,
    wrapperForCustomersDetails
  );
});
