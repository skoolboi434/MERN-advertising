import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, Col, Row, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaComment, FaPencilAlt, FaPlus } from 'react-icons/fa';
import { useGetSinglePublicationQuery, useUpdatePublicationMutation } from '../slices/publicationApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { toast } from 'react-toastify';

const SinglePublication = () => {
  const { id: publicationId } = useParams();

  const [publications, setPublications] = useState([]);

  const { data: publication, isLoading, error, refetch } = useGetSinglePublicationQuery(publicationId);

  const [updatePublication, { isLoading: loadingUpdate }] = useUpdatePublicationMutation();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: '', address: '', city: '', state: '', zipcode: '', status: '', parentPublication: '' });

  useEffect(() => {
    if (publication) {
      setFormData({
        name: publication.name,
        address: publication.address,
        city: publication.city,
        state: publication.state,
        zipcode: publication.zipcode,
        status: publication.status,
        parentPublication: publication.parentPublication || ''
      });
    }
  }, [publication]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchPublications = async () => {
      const { data } = await axios.get('/api/publications');
      setPublications(data);
    };

    fetchPublications();
  }, []);

  // Show / Hide modal

  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    //setFormData(initialFormState);
    setShowModal(true);
  };

  const parentPub = publication && publications.find(p => p._id === publication.parentPublication);

  const submitHandler = async e => {
    e.preventDefault();

    const updatedPublication = {
      _id: publicationId,
      ...formData,
      parentPublication: formData.parentPublication || null
    };

    const result = await updatePublication(updatedPublication);

    if (result.error) {
      toast.error(result.error?.data?.message || result.error.error);
    } else {
      toast.success('Publication updated');
      setShowModal(false);
      refetch();
    }
  };

  return (
    <Container>
      <div className='link-container mb-3'>
        <Link to='/publications'>Back to Publication dashboard</Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <div className='rounded bg-white shadow p-3 mb-3'>
            <div className='mb-3 d-flex border-bottom border-dark pb-2'>
              <h3 className='mb-0 me-lg-5'>Publication Overview</h3>
              <Button variant='primary' className='d-flex align-items-center' onClick={openModal}>
                <FaPencilAlt className='me-2' />
                Edit Info
              </Button>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Form onSubmit={submitHandler}>
                <Modal.Header closeButton>
                  <Modal.Title>New Publication</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Group className='mb-3'>
                    <Form.Label>Publication Name</Form.Label>
                    <Form.Control type='text' name='name' required value={formData.name} onChange={handleChange} />
                  </Form.Group>

                  <Form.Group className='mb-3'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type='text' name='address' required value={formData.address} onChange={handleChange} />
                  </Form.Group>

                  <Row>
                    <Col>
                      <Form.Group className='mb-3'>
                        <Form.Label>City</Form.Label>
                        <Form.Control type='text' name='city' value={formData.city} required onChange={handleChange} />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className='mb-3'>
                        <Form.Label>State</Form.Label>
                        <Form.Control type='text' name='state' required value={formData.state} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className='mb-3'>
                        <Form.Label>Zipcode</Form.Label>
                        <Form.Control type='number' name='zipcode' required value={formData.zipcode} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className='mb-3'>
                    <Form.Label>Parent Publication</Form.Label>
                    <Form.Select name='parentPublication' value={formData.parentPublication} onChange={handleChange}>
                      <option value=''>None</option>
                      {publications
                        ?.filter(pub => pub._id !== publication._id)
                        .map(pub => (
                          <option key={pub._id} value={pub._id}>
                            {pub.name}
                          </option>
                        ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Status</Form.Label>
                    <Form.Select name='status' value={formData.status} onChange={handleChange}>
                      <option value=''>Select a status</option>
                      <option value='active'>Active</option>
                      <option value='inactive'>Inactive</option>
                    </Form.Select>
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant='secondary' onClick={() => setShowModal(false)}>
                    Cancel
                  </Button>
                  <Button variant='primary' type='submit'>
                    Update
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal>

            <Row>
              <Col md={12} lg={6}>
                <Row className='mb-3'>
                  <Col>
                    <p className='mb-0'>#ID:</p>
                    <span>
                      <strong>{publication._id}</strong>
                    </span>
                  </Col>

                  <Col>
                    <p className='mb-0'>Status:</p>
                    <span className='text-capitalize'>
                      <strong>{publication.status}</strong>
                    </span>
                  </Col>
                </Row>

                <Row className='mb-3'>
                  <Col>
                    <p className='mb-0'>Publication Name:</p>
                    <span>
                      <strong>{publication.name}</strong>
                    </span>
                  </Col>
                </Row>

                <Row className='mb-3'>
                  <Col>
                    <p className='mb-0'>Address:</p>
                    <span>
                      <strong>
                        {publication.address} <br /> {publication.city}, {publication.state} {publication.zipcode}
                      </strong>
                    </span>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <p className='mb-0'>Parent Publication:</p>
                    <span>
                      <strong>{parentPub ? parentPub.name : 'No'}</strong>
                    </span>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>

          <div className='rounded bg-white shadow p-3 mb-3'>
            <div className='mb-3 '>
              <h3 className='mb-0 me-lg-5'>Publication Product</h3>
            </div>

            <div className='mx-auto'>
              <div className='text-center'>
                <p className='text-muted mt-3'>No publication products yet.</p>
                <Button variant='primary'>
                  <FaPlus /> Add Product
                </Button>
              </div>
            </div>
          </div>

          <Row>
            <Col md={12} lg={6}>
              <div className='rounded bg-white shadow p-3'>
                <div className='mb-3'>
                  <h3 className='mb-0'>
                    <FaComment /> Notes
                  </h3>
                </div>

                <div className='text-center my-3'>
                  <p className='mb-0'>
                    Write and view notes regarding this
                    <br />
                    publication and its product(s)
                  </p>
                </div>

                <Form>
                  <Form.Group className='mb-3'>
                    <Form.Label>Publication Note</Form.Label>
                    <Form.Control as='textarea' rows={5}></Form.Control>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Note Type</Form.Label>
                    <Form.Select aria-label='Note type select' className='mb-3'>
                      <option>Open this select menu</option>
                      <option value='general'>General</option>
                      <option value='reminder'>Reminder</option>
                      <option value='follow-up'>Follow Up</option>
                    </Form.Select>

                    <Button variant='primary' type='submit'>
                      Add Note
                    </Button>
                  </Form.Group>
                </Form>

                <div className='note-list mt-5'>
                  <h5>Notes</h5>

                  <p className='text-muted'>No notes added yet.</p>
                </div>
              </div>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default SinglePublication;
