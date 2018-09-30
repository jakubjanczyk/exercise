import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { mountWithCustomWrappers } from '../test-utils/custom-wrappers';
import { flushPromises } from '../test-utils/async-utils';
import { wrapperForNotes } from './notes/notes-test-wrapper';
import { wrapperForCustomersDetails } from './details/customer-details-test-wrapper';
import { CustomersPage } from './CustomersPage';
import { wrapperForCustomersList } from './list/customers-list-test-wrapper';
import { wrapperForCustomersPage } from './customers-page-test-wrapper';

const mock = new MockAdapter(axios);

jest.mock('uuid', () => () => '12345');

describe('CustomersPage', () => {
  const customers = [
    {
      id: '123',
      status: 'prospective',
      createdAt: '2018-09-23 16:11:30',
      name: 'Jane Doe',
      phone: '+48234872923',
      notes: [
        { text: 'Some note', id: '1' },
        { text: 'Other note note', id: '2' }
      ]
    },
    {
      id: '234', status: 'current', createdAt: '2018-09-20 12:15:30', name: 'John Doe', phone: '+48345213976', notes: []
    },
    {
      id: '345',
      status: 'prospective',
      createdAt: '2018-09-26 12:15:30',
      name: 'John Smith',
      phone: '+48345213333',
      notes: []
    },
    {
      id: '456',
      status: 'non-active',
      createdAt: '2018-09-18 12:15:30',
      name: 'Amy Smith',
      phone: '+48333444555',
      notes: []
    }
  ];

  beforeEach(() => {
    mock.onGet(/\/customers/).replyOnce(200, customers);
  });

  afterEach(() => {
    mock.reset();
  });

  it('should display list of fetched customers', async () => {
    const component = await mountPage();

    expect(component.customersRows()).toEqual([
      ['123', 'prospective', '2018-09-23 16:11:30', 'Jane Doe', '+48234872923'],
      ['234', 'current', '2018-09-20 12:15:30', 'John Doe', '+48345213976'],
      ['345', 'prospective', '2018-09-26 12:15:30', 'John Smith', '+48345213333'],
      ['456', 'non-active', '2018-09-18 12:15:30', 'Amy Smith', '+48333444555']
    ]);
  });

  describe('filtering', () => {
    it('should allow to filter list of customers by ID', async () => {
      const component = await mountPage();

      component.typeFilterText('456');

      expect(component.customersRows()).toEqual([
        ['456', 'non-active', '2018-09-18 12:15:30', 'Amy Smith', '+48333444555']
      ]);
    });

    it('should allow to filter list of customers by status', async () => {
      const component = await mountPage();

      component.typeFilterText('prospective');

      expect(component.customersRows()).toEqual([
        ['123', 'prospective', '2018-09-23 16:11:30', 'Jane Doe', '+48234872923'],
        ['345', 'prospective', '2018-09-26 12:15:30', 'John Smith', '+48345213333'],
      ]);
    });

    it('should allow to filter list of customers by date', async () => {
      const component = await mountPage();

      component.typeFilterText('09-23');

      expect(component.customersRows()).toEqual([
        ['123', 'prospective', '2018-09-23 16:11:30', 'Jane Doe', '+48234872923'],
      ]);
    });

    it('should allow to filter list of customers by name', async () => {
      const component = await mountPage();

      component.typeFilterText('Doe');

      expect(component.customersRows()).toEqual([
        ['123', 'prospective', '2018-09-23 16:11:30', 'Jane Doe', '+48234872923'],
        ['234', 'current', '2018-09-20 12:15:30', 'John Doe', '+48345213976']
      ]);
    });

    it('should allow to filter list of customers by phone number', async () => {
      const component = await mountPage();

      component.typeFilterText('+48234872');

      expect(component.customersRows()).toEqual([
        ['123', 'prospective', '2018-09-23 16:11:30', 'Jane Doe', '+48234872923']
      ]);
    });

    it('should allow to filter list of customers by multiple fields', async () => {
      const component = await mountPage();

      component.typeFilterText('234');

      expect(component.customersRows()).toEqual([
        ['123', 'prospective', '2018-09-23 16:11:30', 'Jane Doe', '+48234872923'],
        ['234', 'current', '2018-09-20 12:15:30', 'John Doe', '+48345213976']
      ]);
    });

    it('should keep sorting when filtering', async () => {
      const component = await mountPage();

      component.clickOnColumnHeader('Name');
      component.clickOnColumnHeader('Name');
      component.typeFilterText('prospective');

      expect(component.customersRows()).toEqual([
        ['345', 'prospective', '2018-09-26 12:15:30', 'John Smith', '+48345213333'],
        ['123', 'prospective', '2018-09-23 16:11:30', 'Jane Doe', '+48234872923'],
      ]);
    });

    describe('customer details', () => {
      it('should not open customer details by default', async () => {
        const component = await mountPage();

        expect(component.customerDetailsComponent()).not.toExist();
      });

      it('should open customer details when clicked on customer', async () => {
        const component = await mountPage();

        component.clickOnCustomerAtRow(0);

        expect(component.customerDetailsComponent()).toExist();
      });

      it('should close customer details when clicked on back button', async () => {
        const component = await mountPage();

        component.clickOnCustomerAtRow(0);
        component.goBackToList();

        expect(component.customerDetailsComponent()).not.toExist();
      });

      it('should display all basic customer details', async () => {
        const component = await mountPage();

        component.clickOnCustomerAtRow(0);

        expect(component.customerDetailsId()).toEqual('123');
        expect(component.customerDetailsName()).toEqual('Jane Doe');
        expect(component.customerDetailsCreatedAt()).toEqual('2018-09-23 16:11:30');
        expect(component.customerDetailsPhone()).toEqual('+48234872923');
        expect(component.customerDetailsStatus()).toEqual('prospective');
      });

      it('should open one customer, close, open another one with new data', async () => {
        const component = await mountPage();

        component.clickOnCustomerAtRow(0);
        component.goBackToList();
        component.clickOnCustomerAtRow(1);

        expect(component.customerDetailsId()).toEqual('234');
      });

      it('should allow to change status of a customer', async () => {
        const component = await mountPage();
        component.clickOnCustomerAtRow(0);

        component.changeCustomerStatus('current');

        expect(component.customerDetailsStatus()).toEqual('current');
      });

      it('should update status and refresh a list once confirmed', async () => {
        const newCustomer = {
          ...customers[0],
          status: 'current'
        };
        mock.onPut(/\/customers\/123/, newCustomer).replyOnce(200);
        mock.onGet(/\/customers/).replyOnce(200, customers.map(customer => (customer.id === newCustomer.id ? newCustomer : customer)));
        const component = await mountPage();
        component.clickOnCustomerAtRow(0);

        component.changeCustomerStatus('current');
        component.confirmCustomerChange();
        await flushPromises();
        component.update();
        component.goBackToList();

        expect(component.customersTableRowAt(0)).toEqual(
          ['123', 'current', '2018-09-23 16:11:30', 'Jane Doe', '+48234872923']
        );
      });

      it('confirm button should be disabled when no change', async () => {
        const component = await mountPage();
        component.clickOnCustomerAtRow(0);

        expect(component.confirmCustomerChangeButton()).toBeDisabled();
      });

      describe('notes', () => {
        it('should display all notes for a customer', async () => {
          const component = await mountPage();

          component.clickOnCustomerAtRow(0);

          expect(component.customerNotes()).toEqual([
            'Some note',
            'Other note note'
          ]);
        });

        it('should allow to add and save a note', async () => {
          const newCustomer = {
            ...customers[0],
            notes: [
              ...customers[0].notes,
              { text: 'Some New Note', id: '12345' }
            ]
          };
          mock.onPut(/\/customers\/123/, newCustomer).replyOnce(200);
          mock.onGet(/\/customers/).replyOnce(200, customers.map(customer => (customer.id === newCustomer.id ? newCustomer : customer)));
          const component = await mountPage();

          component.clickOnCustomerAtRow(0);
          component.typeNote('Some New Note');
          await component.addNote();

          expect(component.customerNotes()).toEqual([
            'Some note',
            'Other note note',
            'Some New Note'
          ]);
        });

        it('should clear input when note added', async () => {
          const component = await mountPage();

          mock.onPut(/\/customers\/123/).replyOnce(200);
          mock.onGet(/\/customers/).replyOnce(200, customers);
          component.clickOnCustomerAtRow(0);
          component.typeNote('Some New Note');
          await component.addNote();

          expect(component.newNoteInputText()).toEqual('');
        });

        it('should disable add note button when no text typed', async () => {
          const component = await mountPage();

          component.clickOnCustomerAtRow(0);

          expect(component.addNoteButton()).toBeDisabled();
        });

        describe('editing', () => {
          it('should not edit note by default', async () => {
            const component = await mountPage();

            component.clickOnCustomerAtRow(0);

            expect(component.isEditingNoteAt(0)).toBeFalsy();
          });

          it('should go to edit mode for a note when edit button clicked', async () => {
            const component = await mountPage();

            component.clickOnCustomerAtRow(0);
            component.editNote(0);

            expect(component.isEditingNoteAt(0)).toBeTruthy();
          });

          it('should set current text into input when started editing', async () => {
            const component = await mountPage();

            component.clickOnCustomerAtRow(0);
            component.editNote(0);

            expect(component.textForEditingNoteAt(0)).toEqual('Some note');
          });

          it('should allow to change note text', async () => {
            const component = await mountPage();

            component.clickOnCustomerAtRow(0);
            component.editNote(0);
            component.typeForEditingNoteAt(0, 'Some note new');

            expect(component.textForEditingNoteAt(0)).toEqual('Some note new');
          });

          it('only one note edited when button clicked', async () => {
            const component = await mountPage();

            component.clickOnCustomerAtRow(0);
            component.editNote(0);

            expect(component.isEditingNoteAt(1)).toBeFalsy();
          });

          it('allows to edit multiple notes', async () => {
            const component = await mountPage();

            component.clickOnCustomerAtRow(0);
            component.editNote(0);
            component.editNote(1);

            expect(component.isEditingNoteAt(0)).toBeTruthy();
            expect(component.isEditingNoteAt(1)).toBeTruthy();
          });

          it('should hide edit note button when in edit mode', async () => {
            const component = await mountPage();

            component.clickOnCustomerAtRow(0);
            component.editNote(0);

            expect(component.editNoteButtonAt(0)).not.toExist();
          });

          it('should show confirm and cancel buttons when editing', async () => {
            const component = await mountPage();

            component.clickOnCustomerAtRow(0);
            component.editNote(0);

            expect(component.editNoteConfirmButtonAt(0)).toExist();
            expect(component.editNoteCancelButtonAt(0)).toExist();
          });

          it('should not show confirm and cancel buttons when not editing', async () => {
            const component = await mountPage();

            component.clickOnCustomerAtRow(0);

            expect(component.editNoteConfirmButtonAt(0)).not.toExist();
            expect(component.editNoteCancelButtonAt(0)).not.toExist();
          });

          it('should close edit mode on confirm', async () => {
            const component = await mountPage();

            component.clickOnCustomerAtRow(0);
            component.editNote(0);
            component.typeForEditingNoteAt(0, 'Some note new');
            await component.confirmEditingNoteAt(0);

            expect(component.isEditingNoteAt(0)).toBeFalsy();
          });

          it('should disable confirm button when no note text', async () => {
            const component = await mountPage();
            component.clickOnCustomerAtRow(0);
            component.editNote(0);

            component.typeForEditingNoteAt(0, '');

            expect(component.editNoteConfirmButtonAt(0)).toBeDisabled();
          });

          it('should update actual note on confirm', async () => {
            const newCustomer = {
              ...customers[0],
              notes: customers[0].notes.map(note => (note.id === '1' ? { ...note, text: 'Some note new' } : note))
            };
            mock.onPut(/\/customers\/123/, newCustomer).replyOnce(200);
            mock.onGet(/\/customers/).replyOnce(200, customers);

            const component = await mountPage();
            component.clickOnCustomerAtRow(0);
            component.editNote(0);
            component.typeForEditingNoteAt(0, 'Some note new');

            await component.confirmEditingNoteAt(0);

            expect(component.customerNotes()).toEqual([
              'Some note new',
              'Other note note'
            ]);
          });

          it('should close edit mode on cancel', async () => {
            const component = await mountPage();

            component.clickOnCustomerAtRow(0);
            component.editNote(0);
            component.typeForEditingNoteAt(0, 'Some note new');
            component.cancelEditingNoteAt(0);

            expect(component.isEditingNoteAt(0)).toBeFalsy();
          });

          it('should go back to previous note on cancel', async () => {
            const component = await mountPage();
            component.clickOnCustomerAtRow(0);
            component.editNote(0);
            component.typeForEditingNoteAt(0, 'Some note new');

            component.cancelEditingNoteAt(0);

            expect(component.customerNotes()).toEqual([
              'Some note',
              'Other note note'
            ]);
          });
        });
      });
    });
  });

  const mountPage = async () => {
    const component = mountWithCustomWrappers(
      <CustomersPage />,
      wrapperForCustomersList,
      wrapperForCustomersPage,
      wrapperForCustomersDetails,
      wrapperForNotes
    );
    await flushPromises();
    component.update();

    return component;
  };
});
