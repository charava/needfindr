import React from 'react';

class AddNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noteTitle: '',
      noteBody: '',
    }
  }
  handleChangeTitle = (event) => {
    this.setState({noteTitle: event.target.value});
  }
  handleChangeBody = (event) => {
    this.setState({noteBody: event.target.value});
  }

  handleSaveClick = () => {
    console.log('in handle save click')
    this.props.handleAddNote(this.state.noteTitle, this.state.noteBody);
    this.setState({noteTitle:''})
    this.setState({noteBody:''})
  }



  render () {
    return(
      <div className='addNote'>
        <div className='addNote-header'>
          <textarea className='addNote-title'
            rows='2'
            cols='10'
            placeholder='Add the title here...'
            value={this.state.noteTitle}
            onChange={this.handleChangeTitle}
          ></textarea>
          <textarea className='addNote-body'
            rows='8'
            cols='10'
            placeholder='Type to add a note...'
            value={this.state.noteBody}
            onChange={this.handleChangeBody}
          ></textarea>
        </div>
        <div className='note-footer'>
          <button className='save' onClick={this.handleSaveClick}>
            Save
          </button>
        </div>
      </div>

    );
  }
}

export default AddNote;
