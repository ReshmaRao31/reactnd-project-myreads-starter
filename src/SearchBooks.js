import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import Books from './Books'
import PropTypes from 'prop-types'

class SearchBooks extends Component{
    render() {
        const { searchedBooks, onSearch, query, updateBook, resetSearch } = this.props;
        
        return (
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/' onClick={resetSearch}>Close</Link>
              <div className="search-books-input-wrapper">
    
                <input
                  type="text"
                  placeholder="Search by title or author"
                  value={query}
                  onChange={(event) => onSearch(event.target.value)}
                />
    
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {
                  searchedBooks && searchedBooks.map((book) => {
                    return (
                      <li key={book['id']}>
                        <Books book={book} updateBook={updateBook} />
                      </li>
                    )
                  })
                }
              </ol>
            </div>
          </div>
        )
      }
    }
    
    SearchBooks.propTypes = {
      searchResults: PropTypes.array,
      query: PropTypes.string.isRequired,
      updateBook: PropTypes.func.isRequired,
      onSearch: PropTypes.func.isRequired
    }
    

export default SearchBooks