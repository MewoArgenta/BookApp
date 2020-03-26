import React from 'react';
import PropTypes from 'prop-types';
import './App.css'

class BookshelfChanger extends React.Component {
  handleAnswer = (book, event) => {
    this.props.handleAddShelf(book,event.target.value);
  };

  render(){
    const  { book, shelfTitle } = this.props;
    return(
      <div className="book-shelf-changer">
        <select onChange={event => this.handleAnswer(book,event)}>
          <option value="move" selected={shelfTitle==='None'} disabled>Move to...</option>
          <option value="currentlyReading" selected={shelfTitle==='Currently Reading'} disabled={shelfTitle==='Currently Reading'}>Currently Reading</option>
          <option value="wantToRead"  selected={shelfTitle==='Want to Read'} disabled={shelfTitle==='Want to Read'}>Want to Read</option>
          <option value="read" selected={shelfTitle==='Read'} disabled={shelfTitle==='Read'}>Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

BookshelfChanger.propTypes = {
  book: PropTypes.object,
  handleAddShelf: PropTypes.func,
  shelfTitle: PropTypes.string
};
export default BookshelfChanger