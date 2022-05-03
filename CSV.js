//NO LONGER USED

import * as Papa from 'papaparse';
import NotesList from './NotesList';
import React from 'react';


class CSV extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    }
    const problemsFile = 'https://raw.githubusercontent.com/charava/Reddit/main/identifiedproblems.csv'
    const asksFile = 'https://raw.githubusercontent.com/charava/Reddit/main/identifiedasks.csv'
    const ideasFile = 'https://raw.githubusercontent.com/charava/Reddit/main/identifiedideas.csv'
  }

  componentDidMount() {
    this.parse(this.props.csvFile)
    console.log('parsed')
  }

  setText = (res) => {
    this.setState({posts: res.data})
  }

  parse = (link) => {
    Papa.parse(link, {
      download: true,
      complete: result => this.setText(result),
      header:true
    })
  }
  // TODO: FIGURE OUT HOW TO DELETE THE CSV POSTS
  CSVdeleteNote = (i) => {
    const newNotes = this.state.posts.filter((post) => post.id !== i);
    this.setState({notes: newNotes})
  };

  render(){
    if (this.state.posts.length == 0) {
      return <div>Loading!...</div>
    }
    else {
      {console.log(this.state.posts)}

    //  return(


      //  <NotesList
      //    notes={this.state.posts}
  //        handleDeleteNote={this.CSVdeleteNote}
    //    />
    //  );
    }
  }
}

export default CSV;
