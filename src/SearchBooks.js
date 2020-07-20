import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookGrid from './BookGrid'
import Shelf from './Shelf'

class SearchBooks extends Component {

  state = {
    queryBooks: []
  }

  updateQuery = (value) => {


    BooksAPI.search(value)
      .then((res) => {
        let queryResults = res;
        console.log("Queried Books", queryResults)
        return queryResults
      })
      .then((results) => {
        if(Array.isArray(results)) {
          return results.map((book) => {
            if(this.props.books.find((origBook) => origBook.id === book.id)) {
              return this.props.books.find((origBook) => origBook.id === book.id);
            } else {
              return book;
            }
          })
        } else {
          return [];
        }
      })
      .then((books) => {
        this.setState(() => ({
          queryBooks: books
        }))
        console.log("Compared Books", books)
      })

  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */
            }
            <input type="text" placeholder="Search by title or author" onChange={(event) => this.updateQuery(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          {Array.isArray(this.state.queryBooks) && this.state.queryBooks !== [] &&
            <BookGrid books={this.state.queryBooks.filter((book) => !book.shelf)} onShelfUpdate={this.props.onShelfUpdate}/>
          }
        </div>
        <div className="bookshelf">
          <Shelf books={this.state.queryBooks} onShelfUpdate={this.props.onShelfUpdate}/>
        </div>
      </div>
    )
  }
}

export default SearchBooks
