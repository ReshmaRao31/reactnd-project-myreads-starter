import React from 'react'
import PropTypes from 'prop-types'
import Books from './Books'

const Shelf = (props) => {
    const { shelf, mybooks, updateBook } = props;
    const booksOnShelf = mybooks.filter(book => book.shelf === shelf.shelf);
   
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {booksOnShelf.map(book => (
              <Books key={book.id} book={book} shelf={shelf.Shelf} updateBook={updateBook} />
            ))}
          </ol>
        </div>
      </div>
    );
  };

Shelf.propTypes = {
    mybooks: PropTypes.array.isRequired,
    updateBook: PropTypes.func.isRequired
}
export default Shelf