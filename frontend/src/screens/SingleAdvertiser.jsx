import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Col, Row, Form, Modal, Tab, Tabs, Table } from 'react-bootstrap';
import { useGetSingleAdvertiserQuery, useUpdateAdvertiserMutation } from '../slices/advertiserApiSlice';
import { Link } from 'react-router-dom';
import { FaComment, FaPencilAlt, FaPlus } from 'react-icons/fa';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { toast } from 'react-toastify';

const SingleAdvertiser = () => {
  // Get Advertiser ID from URL
  const { id: advertiserId } = useParams();

  const { data: advertiser, isLoading, error, refetch } = useGetSingleAdvertiserQuery(advertiserId);

  const [updateAdvertiser, { isLoading: loadingUpdate }] = useUpdateAdvertiserMutation();

  const [formData, setFormData] = useState({ firstname: '', lastname: '', email: '', phone: '', businessname: '', accountType: '', address: '', city: '', state: '', zipcode: '', status: '', billingEmail: '', contact: '' });

  useEffect(() => {
    if (advertiser) {
      setFormData({
        firstname: advertiser.firstname,
        lastname: advertiser.lastname,
        email: advertiser.email,
        phone: advertiser.phone,
        businessname: advertiser.businessname,
        accountType: advertiser.accountType,
        address: advertiser.address,
        city: advertiser.city,
        state: advertiser.state,
        zipcode: advertiser.zipcode,
        status: advertiser.status,
        billingEmail: advertiser.billingEmail,
        contact: advertiser.contact
      });
    }
  }, [advertiser]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const submitHandler = async e => {
    e.preventDefault();

    const updatedAdvertiser = {
      _id: advertiserId,
      ...formData
    };

    const result = await updateAdvertiser(updatedAdvertiser);

    if (result.error) {
      toast.error(result.error?.data?.message || result.error.error);
    } else {
      toast.success('Advertiser updated');
      setShowModal(false);
      refetch();
    }
  };

  // Show / Hide Modal
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };

  return (
    <Container>
      <div className='heading-container mb-5'>
        <Link to='/advertisers'>Back to Advertisers</Link>
      </div>

      <Tabs defaultActiveKey='overview' id='fill-tab-advertiser' fill>
        <Tab eventKey='overview' title='Overview' className='p-3'>
          <div className='btn-container mb-5'>
            <Button variant='primary' onClick={openModal}>
              Edit Info
            </Button>
          </div>
          <div className='border-bottom border-dark mb-4'>
            <h3 class='mb-0'>General Info</h3>
          </div>

          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error?.data?.message || error.error}</Message>
          ) : (
            <>
              {/* Edit Modal */}
              <Modal show={showModal} onHide={() => setShowModal(false)} size='xl'>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Advertiser</Modal.Title>
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

                        <Form.Group>
                          <Form.Label>Status</Form.Label>
                          <Form.Select name='status' value={formData.status} onChange={handleChange}>
                            <option value=''>Select a status</option>
                            <option value='active'>Active</option>
                            <option value='inactive'>Inactive</option>
                          </Form.Select>
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
                            <option value='retail'>Retail</option>
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
                    <Modal.Footer className='justify-content-lg-between'>
                      <Button variant='secondary' onClick={() => setShowModal(false)}>
                        Cancel
                      </Button>
                      <Button variant='primary' type='submit'>
                        Update Advertiser
                      </Button>
                    </Modal.Footer>
                  </Form>
                </Modal.Body>
              </Modal>
              {/* End Edit Modal */}
              <Row>
                <Col md={12} lg={6}>
                  <div className='heading-container mb-5'>
                    <h3 className='heading'>{advertiser.businessname}</h3>
                  </div>

                  <Row className='mb-5'>
                    <Col md={12} lg={6}>
                      <span class='fw-bold'>Status:</span>
                      <p class='mb-0 text-capitalize'>{advertiser.status}</p>
                    </Col>

                    <Col md={12} lg={6}>
                      <span class='fw-bold'>Account Type:</span>
                      <p class='mb-0 text-capitalize'>{advertiser.accountType}</p>
                    </Col>
                  </Row>

                  <Row className='mb-5'>
                    <Col md={12} lg={6}>
                      <span class='fw-bold'>Address:</span>
                      <p class='mb-0 text-capitalize'>
                        {advertiser.address} <br />
                        {advertiser.city}, {advertiser.state} {advertiser.zipcode}
                        <br />
                      </p>
                    </Col>

                    <Col md={12} lg={6}>
                      <span class='fw-bold'>Phone:</span>
                      <p class='mb-0 text-capitalize'>{advertiser.phone}</p>
                    </Col>
                  </Row>

                  <div className='mb-5'>
                    <span class='fw-bold'>Email:</span>
                    <p class='mb-0 text-capitalize'>{advertiser.email}</p>
                  </div>
                </Col>

                <Col md={12} lg={6}></Col>
              </Row>

              <div className='border-bottom border-dark mb-5'>
                <h3 className='mb-1'>Billing Info</h3>
              </div>

              <Row>
                <Col md={12} lg={6}>
                  <Row className='mb-3'>
                    <Col md={12} lg={6}>
                      <span class='fw-bold'>Billing Address:</span>
                      <p className='mb-0'>
                        {advertiser.address} <br />
                        {advertiser.city}, {advertiser.state} {advertiser.zipcode}
                      </p>
                    </Col>

                    <Col md={12} lg={6}>
                      <span class='fw-bold'>Billing Contact:</span>
                      <p className='mb-0'>{advertiser.contact}</p>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12} lg={6}>
                      <span class='fw-bold'>Billing Email:</span>
                      <p className='mb-0'>{advertiser.email}</p>
                    </Col>
                  </Row>
                </Col>

                <Col md={12} lg={6}>
                  <div class='price-container text-center mb-5'>
                    <h3 class='color-secondary mb-0'>$230.50</h3>
                    <span>Current Balance</span>
                  </div>

                  <div class='btn-container d-flex justify-content-center'>
                    <button class='btn btn-light border border-dark me-lg-3'>Send Invoice Email</button>
                    <button class='btn btn-light border border-dark'>Email Link to Pay</button>
                  </div>
                </Col>
              </Row>
            </>
          )}
        </Tab>
        <Tab eventKey='history' title='History' className='p-3'>
          <Table bordered hover>
            <thead>
              <tr>
                <th scope='col'>Campaign ID</th>
                <th scope='col'>Name</th>
                <th scope='col'>Date Ordered</th>
                <th scope='col'>Start Date</th>
                <th scope='col'>End Date</th>
                <th scope='col'>Created By</th>
                <th scope='col'>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#001</td>
                <td>Sample Campaign</td>
                <td>00/00/0000</td>
                <td>00/00/0000</td>
                <td>00/00/0000</td>
                <td>Travis</td>
                <td>$0.00</td>
                <td>
                  <span className='text-capitalize'></span>
                </td>
              </tr>
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey='activity' title='Activity'>
          Campaign Activity
        </Tab>
      </Tabs>
    </Container>
  );
};

export default SingleAdvertiser;
