import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

class EditBookModal extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.props.selectedBook);
    const updatedBook = {
      title: e.target.title.value || this.props.selectedBook.title,
      description: e.target.description.value || this.props.selectedBook.description,
      status: this.props.selectedBook.status,
      // _id: this.props.selectedBook._id
    };
    this.props.editBook(updatedBook);
    this.props.closeEditForm();
  };

  render() {
    return (
      <div>
        <Modal show={this.props.showUpdateModal} onHide={this.props.closeEditForm}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Book</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Edit Book Information.</p>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder={this.props.selectedBook.title} id="title" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder={this.props.selectedBook.description} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="status">
                <Form.Check type="checkbox" label="Check me out" checked={this.props.selectedBook.status} />
              </Form.Group>
              <Button variant="secondary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default EditBookModal;
