import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookGrid from './BookGrid'

class SearchBooks extends Component {

  state = {
    queryBooks: []
  }

  updateQuery = (value) => {
    BooksAPI.search(value)
      .then((res) => {
        this.setState(() => ({
          queryBooks: res
        }))
        console.log("Queried Books", res)
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
            <BookGrid onShelfUpdate={this.props.onShelfUpdate} books={this.state.queryBooks}/>
          }
        </div>
      </div>
    )
  }
}

export default SearchBooks
