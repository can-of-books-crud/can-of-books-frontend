import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

class AddBookModal extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    const newBook = {
      title: e.target.title.value,
      description: e.target.description.value,
      status: e.target.status.checked
    };
    this.props.addBook(newBook);
    this.props.closeAddForm();
  };

  render() {
    return (
      <div
        // className="modal show"
        // style={{ display: 'block', position: 'initial' }}
      >
        <Modal show={this.props.showAddModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Book</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Add Book Information.</p>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter book title" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Enter book description" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="status">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}


export default AddBookModal;
