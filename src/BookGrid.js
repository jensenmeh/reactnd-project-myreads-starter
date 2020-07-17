import React, { Component } from 'react';

class BookGrid extends Component {

  render() {
    return (
        <ol className="books-grid">
          {this.props.books.map((book) => (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: `url(${book.imageLinks ? book.imageLinks.smallThumbnail : ""})`
                    }}>
                  </div>
                  <div className="book-shelf-changer">
                    <select value="move" onChange={(event) => this.props.onShelfUpdate(book, event.target.value)}>
                      <option value="move" disabled>Move to...</option>
                      {book.shelf !== "currentlyReading" &&
                        <option value="currentlyReading">Currently Reading</option>
                      }
                      {book.shelf !== "wantToRead" &&
                        <option value="wantToRead">Want to Read</option>
                      }
                      {book.shelf !== "read" &&
                        <option value="read">Read</option>
                      }
                      {book.shelf &&
                        <option value="none">None</option>
                      }
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                {book.authors
                  ? book.authors.map((author) => (
                    <div key={author} className="book-authors">{author}</div>
                  ))
                  : <div className="book-authors">No Author Listed</div>
                }
              </div>
            </li>
          ))}
        </ol>
    )
  }
}

export default BookGrid;
