import React from 'react';
import axios from 'axios';
import { Carousel, Button } from 'react-bootstrap';
import Book from './components/Book';
import BookFormModal from './components/BookFormModal';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showModal: false
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

  openForm = () => {
    this.setState({ showModal: true });
  };

  closeForm = () => {
    this.setState({ showModal: false });
  };

  addBook = (newBook) => {

    const url = `${process.env.REACT_APP_SERVER}/books`;
    axios.post(url, newBook)
      .then(response => this.setState({ books: [...this.state.books, response.data] }))
      .catch(error => console.error(error));
  };

  render() {

    /* TODO: render all the books in a Carousel */

    const { books } = this.state;

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {books.length > 0 ? (
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
        <Button onClick={this.openForm}>Add Book</Button>
        {this.state.showModal && (<BookFormModal addBook={this.addBook} showModal={this.state.showModal} closeForm={this.closeForm} />)}
      </>
    );
  }
}

export default BestBooks;
