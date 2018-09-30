import * as ReactDOM from 'react-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import styles from './customer-details.pcss';
import { Note } from './notes/Note';

export class CustomerDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customer: props.customer,
      newNote: ''
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

  updateNewNote = (event) => {
    const newNote = event.target.value;
    this.setState(() => ({ newNote }));
  };

  addNote = () => {
    const newCustomer = {
      ...this.state.customer,
      notes: [
        ...this.state.customer.notes,
        { text: this.state.newNote, id: uuid() }
      ]
    };

    this.props.changeCustomer(newCustomer)
      .then(() => this.setState(() => ({ customer: newCustomer, newNote: '' })));
  };

  updateNote = (updatedNote) => {
    const newCustomer = {
      ...this.state.customer,
      notes: this.state.customer.notes.map(note => (note.id === updatedNote.id ? updatedNote : note))
    };
    this.props.changeCustomer(newCustomer)
      .then(() => this.setState(() => ({ customer: newCustomer })));
  };

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
            <div>
              <textarea data-test="note-input" value={this.state.newNote} onChange={this.updateNewNote} />
              <button type="button" data-test="add-note-button" onClick={this.addNote} disabled={this.state.newNote === ''}>Add Note</button>
            </div>
            <div data-test="customer-notes">
              {
                customer.notes.map((note) => (
                  <Note note={note} key={note.id} onChange={this.updateNote} />
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
