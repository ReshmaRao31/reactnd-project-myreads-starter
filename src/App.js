import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import ListShelves from './ListShelves'
import SearchBooks from './SearchBooks'

const shelfDetails = [
  { shelf: 'currentlyReading', name: 'Currently Reading' },
  { shelf: 'wantToRead', name: 'Want to Read' },
  { shelf: 'read', name: 'Read' }
];
class BooksApp extends React.Component {
  state = {
    mybooks: [],
    searchedBooks: [],
    query: ''
  }
  componentDidMount = () => {
    this.getAllBooks()
  };

  getAllBooks = () => {
    BooksAPI.getAll()
      .then(books => {
        this.setState({ mybooks: books });
      })
  }
  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then((res) => {
      book.shelf = shelf;
      this.setState(PrevState => ({
        searchedBooks : PrevState.searchedBooks.filter((sbook) => {
          return sbook['id'] !== book['id'];
        }),
        mybooks : PrevState.mybooks.filter((mbook)=> mbook.id !== book.id).concat(book)
      }))
    })
  }

  resetSearch = () => {
    this.setState({
      query: '',
      searchedBooks: []
    })
  }
  onSearch = (query) => {
    this.setState(() => ({
      query: query
    }))
    if (query.length > 0) {
      BooksAPI.search(query).then(books => {
        if (books.error) {
          this.setState({ searchedBooks: [] });
        } else {
          this.state.mybooks.map((bookObj) => {
            books.map((srObj) => {
              if (srObj['id'] === bookObj['id']) {
                srObj['shelf'] = bookObj['shelf']
              }
              else if (!srObj['shelf']) {
                srObj['shelf'] = "none"
              }
              return srObj
            })
            return bookObj
          })
          this.setState({ searchedBooks: books });
        }
      });
    } else {
      this.setState({ searchedBooks: [] });
    }
  };

  render() {
    const { mybooks, searchedBooks, query } = this.state;
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListShelves shelfDetails={shelfDetails} mybooks={mybooks} updateBook={this.updateBook} />
        )} />
        <Route exact path='/search' render={() => (
          <SearchBooks searchedBooks={searchedBooks} onSearch={this.onSearch} query={query} updateBook={this.updateBook} resetSearch={this.resetSearch} />
        )} />
      </div>
    )
  }
}

export default BooksApp
