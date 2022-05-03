import Note from './Note';
import AddNote from './AddNote';
import React from 'react';

class NotesList extends React.Component {
 constructor(props) {
   super(props);
   //this.props.notes date and time are just here
 }


 render () {
   const newNotes = this.props.notes.map((note) => {
     return (
       <Note
         key={note.id}
         title={note.title}
         id={note.id}
         body={note.body}
         overflow = {note.overFlow}
         //date={note.date}
       //  time={note.time}
         handleDeleteNote={this.props.handleDeleteNote}
       />
     );
   })

   return (
     <div className='notes-list'>
       {newNotes}
     </div>
   );
 }
}

export default NotesList;
