import React from 'react';
import PropTypes from 'prop-types';
import './App.css'
import Book from './Book'


class Shelf extends React.Component {

  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  };

  render() {
    const { title, books, handleAddShelf } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              books.map((book) =>
                (
                  <li key={book.id}>
                    <Book
                      handleAddShelf={handleAddShelf}
                      book={book}
                      shelfTitle={title}
                    />
                  </li>
                )
              )
            }
          </ol>
        </div>
      </div>
    )
  }
}

Shelf.propTypes = {
  book: PropTypes.object,
  handleAddShelf: PropTypes.func,
  shelfTitle: PropTypes.string
};


export default Shelf
