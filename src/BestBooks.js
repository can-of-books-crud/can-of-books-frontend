import React from 'react';
import axios from 'axios';
import { Carousel, Button } from 'react-bootstrap';
import Book from './components/Book';
import AddBookModal from './components/AddBookModal';
import EditBookModal from './components/EditBookModal';
import { withAuth0 } from '@auth0/auth0-react';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showAddModal: false,
      showUpdateModal: false,
      selectedBook: {}
    };
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  componentDidMount() {
    this.getBooks();
  }

  openAddForm = () => {
    this.setState({ showAddModal: true });
  };

  closeAddForm = () => {
    this.setState({ showAddModal: false });
  };

  openEditForm = (book) => {
    this.setState({ showUpdateModal: true, selectedBook: book });
  };

  closeEditForm = () => {
    this.setState({ showUpdateModal: false });
  };

  getToken = () => {
    console.log(this.props);
    return this.props.auth0.getIdTokenClaims()
      .then(res => res.__raw)
      .catch(err => console.error(err))
  };

  getBooks = () => {
    this.getToken()
      .then(jwt => {
        const config = {
          headers: { 'Authorization': `Bearer ${jwt}` }
        }
        return axios.get(`${process.env.REACT_APP_SERVER}/books`, config)
      })
      .then(bookData => this.setState({ books: bookData.data }))
      .catch(err => console.error(err));

    // axios
    //   .get(`${process.env.REACT_APP_SERVER}/books`)
    //   .then(response => this.setState({ books: response.data }, () => console.log(this.state.books)))
    //   .catch(err => console.error(err));
  };

  addBook = (newBook) => {
    this.getToken()
      .then(jwt => {
        const config = {
          headers: { 'Authorization': `Bearer ${jwt}` }
        }
        return axios.post(`${process.env.REACT_APP_SERVER}/books`, newBook, config)
      })
      // const url = `${process.env.REACT_APP_SERVER}/books`;
      // axios.post(url, newBook)
      .then(response => this.setState({ books: [...this.state.books, response.data] }))
      .catch(error => console.error(error));
  };

  deleteBook = async (bookToDelete) => {
    try {
      const res = await this.props.auth0.getIdTokenClaims();
      const jwt = res.__raw;

      const config = {
        headers: { 'Authorization': `Bearer ${jwt}` }
      }

      const url = `${process.env.REACT_APP_SERVER}/books/${bookToDelete._id}`;
      await axios.delete(url, config);
      const updatedBooks = this.state.books.filter(book => book._id !== bookToDelete._id);
      this.setState({ books: updatedBooks });
    }
    catch (error) {
      console.error(error)
    }
  };

  editBook = async (bookToEdit) => {
    try {
      const res = await this.props.auth0.getIdTokenClaims();
      const jwt = res.__raw;

      const config = {
        headers: { 'Authorization': `Bearer ${jwt}` }
      }

      const url = `${process.env.REACT_APP_SERVER}/books/${this.state.selectedBook._id}`;
      await axios.put(url, bookToEdit, config);
      const books = [...this.state.books];
      books.splice(books.findIndex(book => book._id === this.state.selectedBook._id), 1, bookToEdit);
      this.setState({ books });
    }
    catch(error){
      console.error(error);
    }
  };

  render() {

    /* TODO: render all the books in a Carousel */

    const { books } = this.state;
    console.log(this.props);
    return (
      <>
        <h2 className='text-center'>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {books.length > 0 ? (
          <Carousel variant='dark'>
            {books.map(book =>
              <Carousel.Item key={book._id}>
                <Book book={book} />
                <div style={{ textAlign: 'center' }}>
                  <Button onClick={() => this.deleteBook(book)}>Remove Book</Button>
                  <Button onClick={() => this.openEditForm(book)}>Edit Book</Button>
                </div>
              </Carousel.Item>
            )}
          </Carousel>
        ) : (
          <h3>No Books Found :(</h3>
        )}
        <div className='text-center'><Button onClick={this.openAddForm} variant='secondary'>Add Book</Button></div>
        {this.state.showAddModal && (
          <AddBookModal
            addBook={this.addBook}
            showAddModal={this.state.showAddModal}
            closeAddForm={this.closeAddForm}
          />)}

        {this.state.showUpdateModal && (
          <EditBookModal
            showUpdateModal={this.state.showUpdateModal}
            closeEditForm={this.closeEditForm}
            selectedBook={this.state.selectedBook}
            editBook={this.editBook}
          />
        )}
      </>
    );
  }
}

export default withAuth0(BestBooks);
