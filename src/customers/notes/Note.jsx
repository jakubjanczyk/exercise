import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
      <div data-test="customer-note" key={note.id}>
        {
          this.state.editingNote
            ? (
              <div>
                <textarea data-test="note-edit-input" value={editingNote.text} onChange={this.changeNote} />
                <div>
                  <button type="button" onClick={this.confirm} data-test="note-edit-confirm-button" disabled={this.state.editingNote.text === ''}>
                    Confirm
                  </button>
                  <button type="button" onClick={this.cancel} data-test="note-edit-cancel-button">
                    Cancel
                  </button>
                </div>
              </div>
            )
            : (
              <div>
                <div data-test="customer-note-text">
                  {note.text}
                </div>
                <button type="button" onClick={this.editNote} data-test="note-edit-button">Edit</button>
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
