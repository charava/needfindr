import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { nanoid } from 'nanoid';
import { MdDeleteForever } from 'react-icons/md';
import * as Papa from 'papaparse';
//import * as csvdata from './identifiedproblems.csv'

//work in progress...planning on uploading CSV files from
//my quest project to display initially as post it notes
class CSV extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    }

  }
  componentDidMount() {
    this.parse()
  }

  setText = (posts) => {
    this.setState({posts: posts})
  }

  parse = () => {
    Papa.parse('https://raw.githubusercontent.com/charava/Reddit/main/identifiedasks.csv', {
      download: true,
      complete: result => this.setText(result),
      header:true
    })
  }

  /*
  const time = this.props
  */
  render(){
    if (this.state.posts.length == 0) {
      return <div>Loading!...</div>
    } else {
      console.log(this.state.posts)
      this.state.posts.map((post) => (
        <div>{post.title}</div>

      ))
      return(
        <div>
          <span>{this.state.posts}</span>
        </div>
      );
      //map to noteslist component
    }


  }
}



class NotesList extends React.Component {
  constructor(props) {
    super(props);
  }

  //changed id to key btw
  render () {
    const newNotes = this.props.notes.map((note) => {
      return (
        <Note
          key={note.id}
          id={note.id}
          text={note.text}
          date={note.date}
          time={note.time}
          handleDeleteNote={this.props.handleDeleteNote}
        />
      );
    })
    return(
      <div className='notes-list'>
        {newNotes}
        <AddNote handleAddNote={this.props.handleAddNote}/>
      </div>
    );
  }
}



class Note extends React.Component {
  constructor(props) {
    super(props);
    // this.handleDeleteNote = this.props.handleDeleteNote.bind();
  }
  render () {
    return(
      <div className='note'>
        <span>{this.props.text}</span>
        <div className='note-footer'>
          <small>{this.props.date}</small>
          <small className='time'>{this.props.time}</small>
          <MdDeleteForever
            onClick={() => this.props.handleDeleteNote(this.props.id)}
            className='delete-icon'
            size='1.3em'/>
        </div>
      </div>
    );
  }
}


class AddNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noteText: '',
    }
    this.handleAddNote = this.props.handleAddNote.bind();

  }

  render () {
    const handleChange = (event) => {
      this.setState({noteText: event.target.value});
    }
    const handleSaveClick = () => {
      this.handleAddNote(this.state.noteText);
      this.setState({noteText:''}) //fixed the placeholder issue!
    }

    return(
      <div className='note new'>
        <textarea
          rows='8'
          cols='10'
          placeholder='Type to add a note...'
          value={this.state.noteText}
          onChange={handleChange}
        ></textarea>
        <div className='note-footer'>
          <button className='save' onClick={handleSaveClick}>
            Save
          </button>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: '',
      notes: [
        {
          id:nanoid(),
          text: 'This is first note',
          date: '2/27/22',
          time: '1:15 AM'
        },
        {
          id:nanoid(),
          text: 'This is second note',
          date: '2/25/22',
          time: '1:15 AM'
        },
        {
          id:nanoid(),
          text: 'This is third note',
          date: '2/26/22',
          time: '1:15 AM'

        },
      ],
    };
    //this.addNote = this.addNote.bind()
  }

  setNotes = (newNotes) => {
    this.setState({notes: newNotes})
  }
// TODO: FIGURE OUT TIME SITUATION


  addNote = (text) => {
    const pureDate = new Date();
    const date = pureDate.toLocaleDateString();

    const hourAsString = pureDate.toString().slice(16,18);
    const hourAsInteger = parseInt(hourAsString, 10)
    const timeOfDay = 'AM';

    if (hourAsInteger >= 12) {  // it allllll depends on if its AM or PM -- this is PM
      const bigHour = (hourAsInteger - 12).toString();
      const timeOfDay = 'PM';
      const time = bigHour + pureDate.toString().slice(18,21) + ' ' + timeOfDay;

      const newNote = {
        id: nanoid(),
        text: text,
        date: date,
        time: time,
      }
      const combinedList = [...this.state.notes, newNote];
      this.setNotes(combinedList);

    }

    else { // This is AM
      const time = pureDate.toString().slice(16,21) + ' ' + timeOfDay;
// I just set the new note for either if or else with const newNote
      const newNote = {
        id: nanoid(),
        text: text,
        date: date,
        time: time,
      }
      const combinedList = [...this.state.notes, newNote];
      this.setNotes(combinedList);
    }
  }

  deleteNote = (i) => {
    const newNotes = this.state.notes.filter((note) => note.id !== i);
    this.setNotes(newNotes);
  };

//time: time CANNOT RECOGNIZIE TIME AS A VARIABLE
  render () {

    return(
      <div className='container'>
        <NotesList
          notes={this.state.notes}
          handleAddNote={this.addNote}
          handleDeleteNote={this.deleteNote}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
    <CSV />
  </React.StrictMode>,
  document.getElementById('root')
);
