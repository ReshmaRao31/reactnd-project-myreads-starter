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
    mybooks:[],
    searchedBooks:[],
    query: ''
  }
  componentDidMount = () => {
    BooksAPI.getAll()
      .then(books => {
        this.setState({ mybooks: books });
      })
  };
  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then((res) => {
      this.setState((currenyState) => {
        currenyState.searchedBooks = currenyState.searchedBooks.filter((srbook) => {
          return srbook['id'] !== book['id'];
        })
      })
    })
  };

  resetSearch =() =>{
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
          this.setState({ searchedBooks: books });
        }
      });
    } else {
      this.setState({ searchBooks: [] });
    }
  };

  render() {
    const {mybooks, searchedBooks, query} = this.state;
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListShelves shelfDetails={shelfDetails} mybooks={mybooks} updateBook={this.updateBook} />
        )} />
        <Route exact path='/search' render={() => (
          <SearchBooks searchedBooks={searchedBooks} onSearch={this.onSearch} query={query} updateBook={this.updateBook} resetSearch ={this.resetSearch} />
        )} />
      </div>
    )
  }
}

export default BooksApp
