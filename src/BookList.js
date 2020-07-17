import React, { Component } from 'react'
import Shelf from './Shelf'
import { Link } from 'react-router-dom'

class BookList extends Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <Shelf books={this.props.books} onShelfUpdate={this.props.onShelfUpdate} />
        <div className="open-search">
          <Link to="/search">
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default BookList
