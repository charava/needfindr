import React from 'react';
import { MdSearch } from 'react-icons/md';

class Search extends React.Component {
  constructor(props) {
    super(props);
    //handleSearchNote
  }
  render () {
    return (
  		<div className='search'>
  			<MdSearch className='search-icons' size='1.3em' />
  			<input
  				onChange={(event) =>
  					this.props.handleSearchNote(event.target.value)
  				}
  				type='text'
  				placeholder='type to search...'
  			/>
  		</div>
  	);
  }
}


export default Search;
