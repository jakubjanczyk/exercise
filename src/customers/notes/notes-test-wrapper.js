import { flushPromises } from '../../test-utils/async-utils';

export const wrapperForNotes = (component) => {
  const notesComponent = () => component.findByDataTest('customer-notes');
  const customerNotes = () => notesComponent()
    .findByDataTest('customer-note-text')
    .map(note => note.text());

  const typeNote = (note) => component.findByDataTest('note-input').simulate('change', { target: { value: note } });
  const addNoteButton = () => component.findByDataTest('add-note-button');

  const addNote = async () => {
    addNoteButton().click();
    await flushPromises();
    component.update();
  };
  const newNoteInputText = () => component.findByDataTest('note-input').prop('value');

  const noteAt = index => notesComponent()
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
    customerNotes,
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
