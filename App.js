import { nanoid } from 'nanoid';
import NotesList from './components/NotesList';
import Search from './components/Search';
import CSV from './components/CSV';
import React from 'react';
import AddNote from './components/AddNote';
import * as Papa from 'papaparse';


//const App = () => {}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: '',
      notes: [],
      searchText: '',
      pourOver: false,
      submitted: null,
    };
  }

  problemsFile = 'https://raw.githubusercontent.com/charava/Reddit/main/identifiedproblems.csv';
  asksFile = 'https://raw.githubusercontent.com/charava/Reddit/main/identifiedasks.csv';
  ideasFile = 'https://raw.githubusercontent.com/charava/Reddit/main/identifiedideas.csv';


//-----------CSV STUFF--------------
  setCSVNotes = (res) => {
    try {
      res.data.map((note) => {
        if ((note.body.length + note.title.length) > 275)  {
          const newBody = note.body.substr(0,(275 - note.title.length));
          const newNote = {
            id: note.id,
            title: note.title,
            body: newBody,
            overflow: false
            }
          
          /*
          const newNote = {
            id: note.id,
            name: 'Anonymous Reddit User',
            username: 'RedditUser' + note.id,
            password: 'Reddit',
            posts: [{
              title: note.title,
              description: newBody,
                //  body: newBody,
              overflow: true
            }]
          };
          */
          const combinedList = [...this.state.notes, newNote];
          this.setState({notes: combinedList});
        } else {
          const newNote = {
            id: note.id,
            title: note.title,
            body: note.body,
            overflow: false
            }

          /*
          const newNote = {
            id: note.id,
            name: 'Anonymous Reddit User',
            username: 'RedditUser' + note.id,
            password: 'Reddit',
            posts: [{
              title: note.title,
              description: note.body,
                //  body: newBody,
              overflow: false
            }]
          };
          */

          const combinedList = [...this.state.notes, newNote];
          this.setState({notes: combinedList});
        }
      })
    } catch (e) {
      console.log(e)
    }
  }




  parse = (link) => {
    Papa.parse(link, {
      download: true,
      complete: result => this.setCSVNotes(result),
      header:true
    })
  }

  componentDidMount() {
    console.log('in componentDidMount');
    this.parse(this.problemsFile)
  }





  //----------ADD NOTE FUNCTION---------------

  addNote = (title,body) => {
    console.log('im here in addnotes in app.js')

    const pureDate = new Date();
    const date = pureDate.toLocaleDateString();

    const hourAsString = pureDate.toString().slice(16,18);
    const hourAsInteger = parseInt(hourAsString, 10)
    const timeOfDay = 'AM';

    //-------PM---------
    if (hourAsInteger >= 12) {
      const bigHour = (hourAsInteger - 12).toString();
      const timeOfDay = 'PM';
      const time = bigHour + pureDate.toString().slice(18,21) + ' ' + timeOfDay;

    if ((body.length + title.length) > 275)  {
      const newBody = body.substr(0,(275 - title.length));
      const newNote = {
        id: nanoid(),
        title: title,
        body: newBody,
        overflowBody: body, // this is the whole body text to show in shadow box
        date: date,
        time: time,
        overflow: true
      }
      console.log('rendering part 1')
      console.log('combinedlength', newNote.title.length + newNote.body.length)
      const combinedList = [...this.state.notes, newNote];
      this.setNotes(combinedList);

    } else {
      const newNote = {
        id: nanoid(),
        title:title,
        body: body,
        date: date,
        time: time,
        overflow: false
      }
      console.log('rendering part 2')
      console.log('combinedlength', newNote.title.length + newNote.body.length)
      const combinedList = [...this.state.notes, newNote];
      this.setNotes(combinedList);
      }
    }

    //-------AM---------
    else {
      const time = pureDate.toString().slice(16,21) + ' ' + timeOfDay;
      if ((body.length + title.length) > 275)  {
        const newBody = body.substr(0,(275 - title.length));
        const newNote = {
          id: nanoid(),
          title: title,
          body: newBody,
          date: date,
          time: time,
          overflow: true
        }
        console.log('rendering part 3')
        const combinedList = [...this.state.notes, newNote];
        this.setNotes(combinedList);

      } else {
        const newNote = {
          id: nanoid(),
          title:title,
          body: body,
          date: date,
          time: time,
          overflow: false
        }
        console.log('rendering part 4')
        const combinedList = [...this.state.notes, newNote];
        this.setNotes(combinedList);
      }
    }


  }


  //------------DELETE FUNCTION-------------


  deleteNote = (id) => {
    console.log(id)
    const newNotes = this.state.notes.filter((note) => note.id !== id);
    this.setNotes(newNotes);
  };


  //------------CHECKING OVERFLOW FUNCTION-------------


  checkOverflow = ()=> {
    try {
      console.log('im in')
      const newNotes = this.state.notes.map((note) => {
          console.log('this is the note body length', note.body.length)
          if ((note.body.length + note.title.length) > 275)  {
            const newBody = note.body.substr(0,(275 - note.title.length));
            const newNote = {
              title: note.title,
              body: newBody,
              id: note.id,
              overflow: true
            }
            console.log('this is new note', newNote.body.length)
            const combinedList = [...this.state.notes, newNote];
            this.setState({notes: combinedList});
          }  else {
            const newNote = {
              title: note.title,
              body: note.body,
              id: note.id,
              overflow: false
            }
            console.log('this is new note', newNote.body.length)
            const combinedList = [...this.state.notes, newNote];
            this.setState({notes: combinedList});
        }
      })
    }
    catch (e) {
      console.log(e)
    }
  }


  //------------SETTING STATE-------------

  setNotes = (newNotes) => {
    console.log('in setnotes for app.js')
    this.setState({notes: newNotes})

  }

  setSearchText = (searchText) => {
    this.setState({searchText: searchText})
  }



  //------------RENDERING-------------

  render () {
    console.log('note list length', this.state.notes.length)
    return(
      <div className='container'>
        <nav>
          <a className="main-link" href="/index.html">Needfindr</a>
          <ul className="linklist">
            <li className="nav-item">
              <a className="nav-link" href="/problems.html">Problems</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/ideas.html">Ideas</a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="/asks.html">Asks</a>
            </li>
          </ul>
          <Search handleSearchNote={this.setSearchText} />
        </nav>

        <AddNote handleAddNote={this.addNote} />

        <NotesList
          notes={this.state.notes.filter((note) =>
						note.title.toLowerCase().includes(this.state.searchText)
					)}
          //notes={this.state.notes}
          handleDeleteNote={this.deleteNote}
        />

      </div>
    );

  }
}

export default App;
