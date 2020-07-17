import React, { Component } from 'react'
import BookGrid from './BookGrid'

class Shelf extends Component {
  render() {
    return (
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <BookGrid onShelfUpdate={this.props.onShelfUpdate} books={this.props.books.filter((book) => (book.shelf === "currentlyReading"))}/>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <BookGrid onShelfUpdate={this.props.onShelfUpdate} books={this.props.books.filter((book) => (book.shelf === "wantToRead"))}/>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <BookGrid onShelfUpdate={this.props.onShelfUpdate} books={this.props.books.filter((book) => (book.shelf === "read"))}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Shelf
