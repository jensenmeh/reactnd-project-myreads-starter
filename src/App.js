import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import BookList from './BookList'
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
    //remove book
    if(shelf === "none") {
      const shortBookList = this.state.books.filter((origBook) => (origBook.id !== book.id))
      console.log("Shortened book List", shortBookList)
      this.setState(() => ({
        books: shortBookList
      }))
      //update shelf
    } else {
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


  }

  addToShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
    let newBook = book;
    newBook.shelf = shelf;

    this.setState(() => ({
      books: [...this.state.books, newBook]
    }))
    console.log("Added Book State", this.state.books)
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BookList books={this.state.books} onShelfUpdate={this.updateShelf}/>
        )} />
        <Route path='/search' render={() => (
          <SearchBooks books={this.state.books} onShelfUpdate={this.addToShelf}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
