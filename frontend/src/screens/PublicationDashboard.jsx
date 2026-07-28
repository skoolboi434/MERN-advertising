import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PublicationDashboard = () => {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    const fetchPublications = async () => {
      const { data } = await axios.get('/api/publications');
      setPublications(data);
    };

    fetchPublications();
  }, []);

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
      <Table bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Publication Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {publications.map(pub => (
            <tr key={pub._id}>
              <th>#{pub._id}</th>
              <th>
                <Link to={`/publications/${pub._id}`}>{pub.name}</Link>
              </th>
              <th>
                <span className='text-capitalize'>{pub.status}</span>
              </th>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default PublicationDashboard;
