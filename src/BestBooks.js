import React from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import Book from './components/Book';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  componentDidMount() {
    const getBooks = () => {
      axios
        .get(`${process.env.REACT_APP_SERVER}/books`)
        .then(response => this.setState({ books: response.data }, () => console.log(this.state.books)))
        .catch(err => console.error(err));
    };
    getBooks();
  }

  render() {

    /* TODO: render all the books in a Carousel */

    const {books} = this.state;

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length > 0 ? (
          <Carousel variant='dark'>
            {books.map(book =>
              <Carousel.Item key={book._id}>
                <Book book={book} />
              </Carousel.Item>
            )}
          </Carousel>
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    );
  }
}

export default BestBooks;
