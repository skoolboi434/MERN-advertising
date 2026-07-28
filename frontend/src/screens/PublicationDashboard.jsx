import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { useGetPublicationsQuery } from '../slices/publicationApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

import { Link } from 'react-router-dom';

const PublicationDashboard = () => {
  const { data: publications, isLoading, error } = useGetPublicationsQuery();

  return (
    <Container className='border border-dark rounded shadow bg-white py-3'>
      <div className='border-bottom border-dark mb-5'>
        <h3 className='mb-1'>Publications</h3>
      </div>

      <div className='actions-container mb-3'>
        <div className='btn-container'>
          <a href='' className='btn btn-primary'>
            Create New Publication
          </a>
        </div>
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
    </Container>
  );
};

export default PublicationDashboard;
