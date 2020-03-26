import React from 'react';
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import Book from "./Book";

class SearchPage extends React.Component {
  state = {
    books: []
  };

  handleInput = (value) => {
    BooksAPI.search(value,20).then(
      (result) => {
        // make page empty when there are no more books, avoid .map on empty array is not a function
          if(result.error) {this.setState(() => ({books: []}))}
          else{
            const returnedBooks = result.map((book) => {
              return new Object(
                {
                  id: book.id,
                  title: book.title,
                  author: book.authors,
                  backgroundImage: 'url(' + book.imageLinks.thumbnail + ')'
                })
            });
            this.setState((() => ({
              books: returnedBooks
            })));
          }
        })
      .catch(err=>console.log(err))
  };

  render(){
    const { handleAddShelf } = this.props;
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to='/'
            className="close-search"
          >
           Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input onChange={(event) => this.handleInput(event.target.value)} type="text" placeholder="Search by title or author"/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map(book => (
              <li key={book.id}>
                <Book
                  handleAddShelf={handleAddShelf}
                  book={book}
                  shelfTitle='None'
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}
SearchPage.propTypes = {
  handleAddShelf: PropTypes.func,
};

export default SearchPage