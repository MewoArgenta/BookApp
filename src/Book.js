import React from 'react';
import PropTypes from 'prop-types';
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BookshelfChanger from './BookshelfChanger'

class Book extends React.Component {

  render(){
    const { book, handleAddShelf, shelfTitle } = this.props;
    const backgroundImage = book.backgroundImage;
    return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage }}>
          </div>
          <BookshelfChanger
            book={book}
            handleAddShelf={handleAddShelf}
            shelfTitle={shelfTitle}
          />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.author}</div>
      </div>
    )
  }
}
export default Book