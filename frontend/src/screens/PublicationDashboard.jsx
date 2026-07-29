import React, { useEffect, useState } from 'react';
import { Button, Container, Table, Toast, Modal, Form, Row, Col } from 'react-bootstrap';
import { useGetPublicationsQuery, useCreatePublicationMutation } from '../slices/publicationApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';

import { Link } from 'react-router-dom';

const initialFormState = {
  name: '',
  address: '',
  city: '',
  state: '',
  zipcode: '',
  parentPublication: ''
};

const PublicationDashboard = () => {
  const { data: publications, isLoading, error, refetch } = useGetPublicationsQuery();

  const [createPublication, { isLoading: loadingCreate }] = useCreatePublicationMutation();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const openModal = () => {
    setFormData(initialFormState);
    setShowModal(true);
  };

  const submitHandler = async e => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        parentPublication: formData.parentPublication || null
      };
      await createPublication(payload).unwrap();
      toast.success('Publication created');
      setShowModal(false);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const deleteHandler = id => {
    console.log('Delete', id);
  };

  return (
    <Container className='border border-dark rounded shadow bg-white py-3'>
      <div className='border-bottom border-dark mb-3'>
        <h3 className='mb-1'>Publications</h3>
      </div>

      <div className='actions-container mb-3'>
        <div className='btn-container'>
          <Button variant='primary' onClick={openModal}>
            Create New Publication
          </Button>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Form onSubmit={submitHandler}>
          <Modal.Header closeButton>
            <Modal.Title>New Publication</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className='mb-3'>
              <Form.Label>Publication Name</Form.Label>
              <Form.Control type='text' name='name' value={formData.name} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Address</Form.Label>
              <Form.Control type='text' name='address' value={formData.address} onChange={handleChange} required />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className='mb-3'>
                  <Form.Label>City</Form.Label>
                  <Form.Control type='text' name='city' value={formData.city} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className='mb-3'>
                  <Form.Label>State</Form.Label>
                  <Form.Control type='text' name='state' value={formData.state} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className='mb-3'>
                  <Form.Label>Zipcode</Form.Label>
                  <Form.Control type='text' name='zipcode' value={formData.zipcode} onChange={handleChange} required />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className='mb-3'>
              <Form.Label>Parent Publication</Form.Label>
              <Form.Select name='parentPublication' value={formData.parentPublication} onChange={handleChange}>
                <option value=''>None</option>
                {publications
                  ?.filter(pub => pub._id !== formData._id)
                  .map(pub => (
                    <option key={pub._id} value={pub._id}>
                      {pub.name}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant='primary' type='submit' disabled={loadingCreate}>
              {loadingCreate ? 'Creating...' : 'Create Publication'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <Table bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Publication Name</th>
                <th>Status</th>
                <th>Created By</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {publications.map(pub => (
                <tr key={pub._id}>
                  <th>
                    <span>#{pub._id}</span>
                  </th>
                  <th>
                    <Link to={`/publications/${pub._id}`}>{pub.name}</Link>
                  </th>
                  <th>
                    <span className='text-capitalize'>{pub.status}</span>
                  </th>
                  <th>
                    <span className='text-capitalize'>{pub.user.firstname}</span>
                  </th>
                  <th>
                    <FaTrash className='text-danger' />
                  </th>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default PublicationDashboard;
