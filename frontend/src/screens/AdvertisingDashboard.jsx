import React, { useEffect, useState } from 'react';
import { Button, Container, Table, Toast, Modal, Form, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetPublicationsQuery } from '../slices/publicationApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import AdvertiserLookup from '../components/AdvertiserLookup';
import ContainerCustom from '../components/ContainerCustom';

const AdvertisingDashboard = () => {
  const { data: publications, isLoading, error, refetch } = useGetPublicationsQuery();

  const { userInfo } = useSelector(state => state.auth);

  console.log(userInfo);

  return (
    <Container>
      <div className='heading-container text-center my-5'>
        <h3 className='heading'>Welcome - {userInfo.firstname}</h3>
      </div>

      <ContainerCustom>
        <div className='border-bottom border-dark mb-5 w-50 pb-1'>
          <h3 className='mb-0'>Recently Create Publications</h3>
        </div>

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
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </ContainerCustom>

      <Row>
        <Col md={12} lg={7}>
          <AdvertiserLookup />
        </Col>

        <Col md={12} lg={5}>
          <ContainerCustom>
            <div className='border-bottom border-dark mb-3 w-75 pb-1 text-center mx-auto'>
              <h3 className='mb-0'>Quick Start</h3>
            </div>

            <div className='btn-container d-flex flex-column w-75 mx-auto'>
              <Link to='/advertisers' className='btn btn-primary mb-3'>
                Advertisers
              </Link>
              <Link to='/publications' className='btn btn-primary'>
                Publications
              </Link>
            </div>
          </ContainerCustom>
        </Col>
      </Row>
    </Container>
  );
};

export default AdvertisingDashboard;
