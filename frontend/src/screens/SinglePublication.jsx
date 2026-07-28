import React from 'react';
import { useParams } from 'react-router-dom';
import publications from '../publications';
import { Button, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaPencilAlt } from 'react-icons/fa';

const SinglePublication = () => {
  const { id: publicationId } = useParams();
  const publication = publications.find(p => p._id === publicationId);

  console.log(publication);
  return (
    <Container>
      <div className='link-container mb-3'>
        <Link to='/'>Back to dashboard</Link>
      </div>

      <div className='rounded bg-white shadow p-3'>
        <div className='mb-3 d-flex border-bottom border-dark pb-2'>
          <h3 className='mb-0 me-lg-5'>Publication Overview</h3>
          <Button variant='primary' className='d-flex align-items-center'>
            <FaPencilAlt className='me-2' />
            Edit Info
          </Button>
        </div>

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
                  <strong>{publication.parentPublication}</strong>
                </span>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default SinglePublication;
