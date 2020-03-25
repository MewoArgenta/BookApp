import React from 'react';
import PropTypes from 'prop-types';
// import * as BooksAPI from './BooksAPI'
import './App.css'

class BookshelfChanger extends React.Component {
  constructor(props) {
    super(props);
  }
  handleAnswer = (book, event) => {
    this.props.handleAddShelf(book,event.target.value);
  };

  render(){
    const  { book } = this.props;
    //toDO check what to do when the value doesn't change as seen in testing
    return(
      <div className="book-shelf-changer">
        <select onChange={event => this.handleAnswer(book,event)}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}
export default BookshelfChanger