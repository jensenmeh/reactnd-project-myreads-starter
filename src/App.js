import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './BookList'
import SearchBooks from './SearchBooks'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books: books
        }))
        console.log("All Books", books);
      })
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)

    const updatedBooks = this.state.books.map((origBook) => {
      if(origBook.id === book.id) {
        const updatedBook = {
          ...origBook,
          shelf: shelf
        }
        return updatedBook;
      }
      return origBook;
    })

    console.log("updated books", updatedBooks)
    this.setState((prevState) => ({
      books: updatedBooks
    }))
    console.log("New State", this.state.books)
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <BookList onShelfUpdate={this.updateShelf} books={this.state.books.filter((book) => (book.shelf === "currentlyReading"))}/>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <BookList onShelfUpdate={this.updateShelf} books={this.state.books.filter((book) => (book.shelf === "wantToRead"))}/>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <BookList onShelfUpdate={this.updateShelf} books={this.state.books.filter((book) => (book.shelf === "read"))}/>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">
                <button>Add a book</button>
              </Link>
            </div>
          </div>
        )} />
        <Route path='/search' component={SearchBooks}/>
      </div>
    )
  }
}

export default BooksApp
