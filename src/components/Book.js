import React, { Component } from 'react';

class Book extends Component {
  render() {
    const { book } = this.props;
    return (
      <div className='book'>
        <h2>{book.title}</h2>
        <p>{book.description}</p>
        <p>{book.status}</p>
      </div>
    );
  }
}

export default Book;
