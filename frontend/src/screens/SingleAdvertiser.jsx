import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Col, Row, Form, Modal, Tab, Tabs } from 'react-bootstrap';
import { useGetSingleAdvertiserQuery } from '../slices/advertiserApiSlice';
import { Link } from 'react-router-dom';
import { FaComment, FaPencilAlt, FaPlus } from 'react-icons/fa';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { toast } from 'react-toastify';

const SingleAdvertiser = () => {
  // Get Advertiser ID from URL
  const { id: advertiserId } = useParams();

  const { data: advertiser, isLoading, error, refetch } = useGetSingleAdvertiserQuery(advertiserId);

  return (
    <Container>
      <div className='heading-container mb-5'>
        <Link to='/advertisers'>Back to Advertisers</Link>
      </div>

      <Tabs defaultActiveKey='overview' id='fill-tab-advertiser' fill>
        <Tab eventKey='overview' title='Overview' className='p-3'>
          <div className='btn-container mb-5'>
            <Button variant='primary'>Edit Info</Button>
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
                  <Row>
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
        <Tab eventKey='history' title='History'>
          Campaign History
        </Tab>
        <Tab eventKey='activity' title='Activity'>
          Campaign Activity
        </Tab>
      </Tabs>
    </Container>
  );
};

export default SingleAdvertiser;
