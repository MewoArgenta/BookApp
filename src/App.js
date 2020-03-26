import React from 'react'
import './App.css'
import Shelf from './Shelf'
import SearchPage from './SearchPage'
import * as BooksAPI from './BooksAPI'
import { Link, Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    allBooks: [],
    currentlyReading: [],
    wantToRead: [],
    read: []
  };

  transformArrayToBooks = (result) => {
    return result.map((book) => {
      return new Object(
        {
          id: book.id,
          title: book.title,
          author: book.authors,
          backgroundImage: 'url(' + book.imageLinks.thumbnail + ')'
        })
    });
  };

  updateBooks = (id, shelf) => {
    BooksAPI.get(id).then(
    res => {
      const book = {
          id: res.id,
          title: res.title,
          author: res.authors,
          backgroundImage: 'url(' + res.imageLinks.thumbnail + ')'
        };
      switch (shelf) {
        case 'currentlyReading':
          this.setState((prevState => ({
            currentlyReading: [...prevState.currentlyReading, book]
          })));
          break;
        case 'read':
          this.setState((prevState => ({
            read: [...prevState.read, book]
          })));
          break;
        case 'wantToRead':
          this.setState((prevState => ({
            wantToRead: [...prevState.wantToRead, book]
          })));
          break;
      }
    })
  };

  updateLibrary = () => {
    BooksAPI.getAll().then(result => {
      // make allBooks empty when there are no more books, avoid .map on empty array is not a function
      if(result.error) {this.setState(() => ({allBooks: []}))}
      else {
        const returnedBooks = this.transformArrayToBooks(result)
        this.setState((() => ({
          allBooks: returnedBooks
        })))}});
  };

  updateThemBooks = (book, shelf) => {
    this.updateLibrary();
    // make allBooks empty when there are no more books, avoid .map on empty array is not a function
    BooksAPI.update(book,shelf).then((result) => {
      if(result.error) {this.setState(() => ({
        currentlyReading: [],
        wantToRead: [],
        read: []
      }))} else {
        result.currentlyReading.map(id => this.updateBooks(id,'currentlyReading'));
        result.wantToRead.map(id => this.updateBooks(id, 'wantToRead'));
        result.read.map(id => this.updateBooks(id, 'read'));
      }
    });
  };



  componentDidMount() {
    // this is not really to update a book but to retrieve the books on the shelves
    this.updateThemBooks('mock', 'mock')
  }



  deleteFromShelf = id => {
    this.setState(prevState => ({
      currentlyReading: prevState.currentlyReading.filter(el => el.id !== id ),
      wantToRead: prevState.wantToRead.filter(el => el.id !== id ),
      read: prevState.read.filter(el => el.id !== id )
    }));
  };

  handleAddShelf = (book, newShelf) => {
    // make sure that in our state the book is deleted from the shelf/our books without having to load all the books again
    this.deleteFromShelf(book.id);
    this.updateThemBooks(book, newShelf);
  };


  render() {
    const { currentlyReading, wantToRead, read, allBooks } = this.state;
    return (
      <div className="app">
        <Route exact path='/' render={() => (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <Shelf
                title='your books'
                books={allBooks}
                handleAddShelf={this.handleAddShelf}
              />
              <Shelf
                title='Currently Reading'
                books={currentlyReading}
                handleAddShelf={this.handleAddShelf}
              />
              <Shelf
                title='Want to Read'
                books={wantToRead}
                handleAddShelf={this.handleAddShelf}
              />
              <Shelf
                title='Read'
                books={read}
                handleAddShelf={this.handleAddShelf}
              />
            </div>
          </div>
          <div className="open-search">
            <Link
            to='/search'
            >
            Add a book
            </Link>
          </div>
         </div>
          )} />
        <Route
          path='/search'
          render={() => (
            <SearchPage
              handleAddShelf={this.handleAddShelf}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
