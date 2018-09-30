import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { Note } from './Note';
import styles from './notes.pcss';

export class Notes extends Component {
  state = {
    newNote: ''
  };

  updateNewNote = (event) => {
    const newNote = event.target.value;
    this.setState(() => ({ newNote }));
  };

  addNote = () => {
    const notes = [
      ...this.props.notes,
      { text: this.state.newNote, id: uuid() }
    ];

    this.props.updateNotes(notes);
    this.setState(() => ({ newNote: '' }));
  };

  updateNote = (updatedNote) => {
    const notes = this.props.notes.map(note => (note.id === updatedNote.id ? updatedNote : note));
    this.props.updateNotes(notes);
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          Notes
        </div>
        <div data-test="customer-notes" className={styles.notesItems}>
          {
            this.props.notes.map(note => <Note note={note} key={note.id} onChange={this.updateNote} />)
          }
        </div>
        <div className={styles.addContainer}>
          <textarea className={styles.addInput} data-test="note-input" value={this.state.newNote} onChange={this.updateNewNote} />
          <button
            className={styles.addButton}
            type="button"
            data-test="add-note-button"
            onClick={this.addNote}
            disabled={this.state.newNote === ''}
          >
            Add Note
          </button>
        </div>
      </div>
    );
  }
}

Notes.propTypes = {
  updateNotes: PropTypes.func.isRequired,
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired
    })
  ).isRequired,
};
