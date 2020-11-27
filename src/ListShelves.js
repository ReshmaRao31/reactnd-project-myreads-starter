import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Shelf from './Shelf';

class ListShelves extends Component {
  render() {
    const { shelfDetails, mybooks, updateBook } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelfDetails.map(shelf => (
              <Shelf
                key={shelf.shelf}
                shelf={shelf}
                mybooks={mybooks}
                updateBook={updateBook}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="search">
            <button>Add a Book</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default ListShelves;