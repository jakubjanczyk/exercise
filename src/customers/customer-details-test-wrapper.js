import { flushPromises } from '../test-utils/async-utils';

export const wrapperForCustomersDetails = (component) => {
  const customerDetailsComponent = () => component.findByDataTest('customer-details');
  const goBackToList = () => customerDetailsComponent().findByDataTest('back-button').click();

  const customerDetailsId = () => customerDetailsComponent().findByDataTest('customer-id').findByDataTest('value').text();
  const customerDetailsName = () => customerDetailsComponent().findByDataTest('customer-name').findByDataTest('value').text();
  const customerDetailsCreatedAt = () => customerDetailsComponent().findByDataTest('customer-created-at').findByDataTest('value').text();
  const customerDetailsPhone = () => customerDetailsComponent().findByDataTest('customer-phone').findByDataTest('value').text();
  const customerDetailsStatus = () => customerDetailsComponent().findByDataTest('customer-status').findByDataTest('value').prop('value');

  const customerNotes = () => customerDetailsComponent()
    .findByDataTest('customer-note')
    .findByDataTest('customer-note-text')
    .map(note => note.text());

  const changeCustomerStatus = (value) => customerDetailsComponent()
    .findByDataTest('customer-status')
    .findByDataTest('value')
    .simulate('change', { target: { value } });

  const confirmCustomerChangeButton = () => customerDetailsComponent().findByDataTest('customer-confirm-button');

  const confirmCustomerChange = () => confirmCustomerChangeButton().click();

  const typeNote = (note) => customerDetailsComponent().findByDataTest('note-input').simulate('change', { target: { value: note } });
  const addNoteButton = () => customerDetailsComponent().findByDataTest('add-note-button');

  const addNote = async () => {
    addNoteButton().click();
    await flushPromises();
    component.update();
  };
  const newNoteInputText = () => customerDetailsComponent().findByDataTest('note-input').prop('value');

  const noteAt = index => customerDetailsComponent()
    .findByDataTest('customer-note')
    .at(index);

  const editingNoteInputAt = index => noteAt(index).findByDataTest('note-edit-input');
  const isEditingNoteAt = (index) => editingNoteInputAt(index).length > 0;
  const editNoteButtonAt = (index) => noteAt(index).findByDataTest('note-edit-button');

  const editNote = (index) => editNoteButtonAt(index).click();

  const textForEditingNoteAt = (index) => editingNoteInputAt(index).prop('value');
  const typeForEditingNoteAt = (index, value) => editingNoteInputAt(index).simulate('change', { target: { value } });
  const editNoteConfirmButtonAt = (index) => noteAt(index).findByDataTest('note-edit-confirm-button');
  const editNoteCancelButtonAt = (index) => noteAt(index).findByDataTest('note-edit-cancel-button');
  const confirmEditingNoteAt = async (index) => {
    editNoteConfirmButtonAt(index).click();
    await flushPromises();
    component.update();
  };
  const cancelEditingNoteAt = (index) => editNoteCancelButtonAt(index).click();

  return {
    customerDetailsComponent,
    goBackToList,
    customerDetailsId,
    customerDetailsName,
    customerDetailsCreatedAt,
    customerDetailsPhone,
    customerDetailsStatus,
    customerNotes,
    changeCustomerStatus,
    confirmCustomerChangeButton,
    confirmCustomerChange,
    typeNote,
    addNote,
    newNoteInputText,
    addNoteButton,
    isEditingNoteAt,
    editNote,
    editNoteButtonAt,
    textForEditingNoteAt,
    typeForEditingNoteAt,
    editNoteConfirmButtonAt,
    editNoteCancelButtonAt,
    confirmEditingNoteAt,
    cancelEditingNoteAt,
  };
};
