import React, { useEffect, useState } from 'react';
import { Button, Container, Table, Toast, Modal, Form, Row, Col } from 'react-bootstrap';
import { useCreateAdvertiserMutation, useGetAdvertisersQuery, useDeleteAdvertiserMutation } from '../slices/advertiserApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';
import { useGetAccountTypesQuery } from '../slices/admin/accountApiSlice';

import { Link } from 'react-router-dom';

const initialFormState = {
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  businessname: '',
  accountType: '',
  address: '',
  city: '',
  state: '',
  zipcode: '',
  billingEmail: '',
  contact: ''
};

const AdvertisersDashboard = () => {
  // Get all Advertisers
  const { data: advertisers, isLoading, error, refetch } = useGetAdvertisersQuery();

  // Get all Account Types
  const { data: accountTypes, isLoading: loadingAccountTypes, error: accountTypesError } = useGetAccountTypesQuery();

  // Show New Advertiser Modal
  const [showModal, setShowModal] = useState(false);

  const openNewAdvertiserModal = () => {
    setFormData(initialFormState);
    setShowModal(true);
  };

  // End Open New Advertiser Modal

  const [createAdvertiser, { isLoading: loadingCreate }] = useCreateAdvertiserMutation();
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const submitHandler = async e => {
    e.preventDefault();
    try {
      const payload = {
        ...formData
      };
      await createAdvertiser(payload).unwrap();
      toast.success('Advertiser created');
      setShowModal(false);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  // Delete Advertiser
  const [deleteAdvertiser, { isLoading: LoadingDelete }] = useDeleteAdvertiserMutation();

  const deleteHandler = async id => {
    if (window.confirm('Are you sure you want to delete this Advertiser?')) {
      try {
        await deleteAdvertiser(id).unwrap();
        toast.success('Advertiser deleted.');
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  };

  return (
    <Container className='border border-dark rounded shadow bg-white py-3'>
      <div className='border-bottom border-dark mb-3'>
        <h3 className='mb-1'>Advertisers</h3>
      </div>

      <div className='actions-container mb-3'>
        <div className='btn-container'>
          <Button variant='primary' onClick={openNewAdvertiserModal}>
            Create New Advertiser
          </Button>
        </div>
      </div>

      {/* Create new advertiser modal */}

      <Modal show={showModal} onHide={() => setShowModal(false)} size='xl'>
        <Modal.Header closeButton>
          <Modal.Title>New Advertiser</Modal.Title>
        </Modal.Header>
        <Modal.Body className='p-3'>
          <Form onSubmit={submitHandler}>
            <Row>
              <Col md={12} lg={6}>
                <Form.Group className='mb-2'>
                  <Form.Label>First Name:</Form.Label>
                  <Form.Control type='text' name='firstname' value={formData.firstname} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className='mb-2'>
                  <Form.Label>Last Name:</Form.Label>
                  <Form.Control type='text' name='lastname' value={formData.lastname} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className='mb-2'>
                  <Form.Label>Email:</Form.Label>
                  <Form.Control type='email' name='email' value={formData.email} onChange={handleChange} required />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Phone:</Form.Label>
                  <Form.Control type='text' name='phone' value={formData.phone} onChange={handleChange} required />
                </Form.Group>
              </Col>

              <Col md={12} lg={6}>
                <Form.Group className='mb-2'>
                  <Form.Label>Business Name:</Form.Label>
                  <Form.Control type='text' name='businessname' value={formData.businessname} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className='mb-2'>
                  <Form.Label>Account Type:</Form.Label>
                  <Form.Select type='select' name='accountType' value={formData.accountType} onChange={handleChange}>
                    <option value=''>Select Account Type</option>
                    {accountTypes?.map(type => (
                      <option key={type._id} value={type.name}>
                        {type.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className='mb-2'>
                  <Form.Label>Address:</Form.Label>
                  <Form.Control type='text' name='address' value={formData.address} onChange={handleChange} />
                </Form.Group>

                <Form.Group className='mb-2'>
                  <Form.Label>City:</Form.Label>
                  <Form.Control type='text' name='city' value={formData.city} onChange={handleChange} />
                </Form.Group>

                <Form.Group className='mb-2'>
                  <Form.Label>State:</Form.Label>
                  <Form.Control type='text' name='state' value={formData.state} onChange={handleChange} />
                </Form.Group>

                <Form.Group className='mb-2'>
                  <Form.Label>Zipcode:</Form.Label>
                  <Form.Control type='text' name='zipcode' value={formData.zipcode} onChange={handleChange} />
                </Form.Group>

                <Form.Group className='mb-2'>
                  <Form.Label>Billing Email:</Form.Label>
                  <Form.Control type='email' name='billingEmail' value={formData.billingEmail} onChange={handleChange} />
                </Form.Group>

                <Form.Group className='mb-2'>
                  <Form.Label>Billing Contact:</Form.Label>
                  <Form.Control type='text' name='contact' value={formData.contact} onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>

            <Modal.Footer className='justify-content-lg-between d-flex'>
              <Button variant='secondary' onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant='primary' type='submit'>
                Create Advertiser
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      {/* End create advertiser modal */}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : (
        <Table bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Advertiser Name</th>
              <th>Status</th>
              <th>Created By</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {advertisers.map(advertiser => (
              <tr key={advertiser._id}>
                <td>#{advertiser._id}</td>
                <td>
                  <Link to={`/advertisers/${advertiser._id}`}>{advertiser.businessname}</Link>
                </td>
                <td>
                  <span className='text-capitalize'>{advertiser.status}</span>
                </td>
                <td>
                  <span className='text-capitalize'>{advertiser.user.firstname}</span>
                </td>
                <td>
                  <Button variant='link' onClick={() => deleteHandler(advertiser._id)}>
                    <FaTrash className='text-danger' />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default AdvertisersDashboard;
