import { MdDeleteForever } from 'react-icons/md';
import React from 'react';

class Note extends React.Component {
 constructor(props) {
   super(props);

 }

 render () {
   return(
     <div className='note'>
       <div className='note-title'>
         <span>{this.props.title}</span>
       </div>
       <div className='note-body'>
         <span>{this.props.body}</span>
       </div>
       <div className='note-footer'>
         <MdDeleteForever
           onClick={() => this.props.handleDeleteNote(this.props.id)}
           className='delete-icon'
           size='1.3em'/>
       </div>
     </div>
   );
 }
}

export default Note;
