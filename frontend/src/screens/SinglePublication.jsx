import React from 'react';
import { useParams } from 'react-router-dom';
import publications from '../publications';
import { Button, Container, Col, Row, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaComment, FaPencilAlt, FaPlus } from 'react-icons/fa';

const SinglePublication = () => {
  const { id: publicationId } = useParams();
  const publication = publications.find(p => p._id === publicationId);

  console.log(publication);
  return (
    <Container>
      <div className='link-container mb-3'>
        <Link to='/'>Back to dashboard</Link>
      </div>

      <div className='rounded bg-white shadow p-3 mb-3'>
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

            <div class='note-list mt-5'>
              <h5>Notes</h5>

              <p class='text-muted'>No notes added yet.</p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SinglePublication;
