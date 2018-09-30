import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './note.pcss';

export class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editingNote: undefined
    };
  }

  editNote = () => this.setState(() => ({ editingNote: this.props.note }));

  changeNote = (event) => {
    const text = event.target.value;
    this.setState((prevState) => ({ editingNote: { ...prevState.editingNote, text } }));
  };

  confirm = () => {
    this.props.onChange(this.state.editingNote);
    this.setState(() => ({ editingNote: undefined }));
  };

  cancel = () => this.setState(() => ({ editingNote: undefined }));

  render() {
    const { note } = this.props;
    const { editingNote } = this.state;
    return (
      <div data-test="customer-note" key={note.id} className={styles.container}>
        {
          this.state.editingNote
            ? (
              <div className={styles.editNote}>
                <textarea className={styles.editInput} data-test="note-edit-input" value={editingNote.text} onChange={this.changeNote} />
                <div>
                  <button className={styles.confirmButton} type="button" onClick={this.confirm} data-test="note-edit-confirm-button" disabled={this.state.editingNote.text === ''}>
                    <span>&#10004;</span>
                  </button>
                  <button className={styles.cancelButton} type="button" onClick={this.cancel} data-test="note-edit-cancel-button">
                    <span>&#10006;</span>
                  </button>
                </div>
              </div>
            )
            : (
              <div className={styles.readNote}>
                <div className={styles.noteText} data-test="customer-note-text">
                  {note.text}
                </div>
                <button className={styles.editButton} type="button" onClick={this.editNote} data-test="note-edit-button"><span>&#9998;</span></button>
              </div>
            )
        }
      </div>
    );
  }
}

Note.propTypes = {
  note: PropTypes.shape({
    text: PropTypes.string,
    id: PropTypes.string
  }).isRequired,
  onChange: PropTypes.func.isRequired
};
