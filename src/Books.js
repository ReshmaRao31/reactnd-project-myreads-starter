import React from 'react'
import PropTypes from 'prop-types'

const Books = (props) => {
    const { book, updateBook } = props;
    const options = [
        { "id": 'currentlyReading', "value": "Currently Reading" },
        { "id": 'wantToRead', "value": "Want To Read" },
        { "id": 'read', "value": "Read" },
        { "id": 'none', "value": "None" }
    ];

    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book['imageLinks'] && book['imageLinks']['thumbnail']})` }}></div>
                <div className="book-shelf-changer">
                    <select value={book['shelf'] ? book['shelf'] : 'move'} onChange={(event) => { updateBook(book, event.target.value) }} >
                        <option value="move" disabled>Move to...</option>
                        {
                            options.map((value) => {
                                return (
                                    book['shelf'] === value['id'] ? (
                                        <option key={value['id']} value={value['id']}>	&#x2714; {value['value']}</option>
                                    ) : (
                                            <option key={value['id']} value={value['id']}> {value['value']}</option>
                                        )
                                )
                            })
                        }
                    </select>
                </div>
            </div>
            <div className="book-title">{book['title']}</div>
            <div className="book-authors">{book['authors']}</div>
        </div>
    )
}

Books.propTypes = {
    book: PropTypes.object.isRequired,
    updateBook: PropTypes.func.isRequired
};

export default Books;