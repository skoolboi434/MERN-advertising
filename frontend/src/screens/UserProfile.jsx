import React, { useState, useEffect } from 'react';
import { Button, Container, Table, Toast, Modal, Form, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ContainerCustom from '../components/ContainerCustom';
import { useProfileMutation, useGetSingleUserQuery, useUpdateUserMutation } from '../slices/usersApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { toast } from 'react-toastify';

const UserProfile = () => {
  // Get users ID from URL
  const { id: userId } = useParams();

  // Store user data
  const { data: user, isLoading, refetch } = useGetSingleUserQuery(userId);

  const [formData, setFormData] = useState({ firstname: '', lastname: '', username: '', email: '', phone: '', role: '', status: '', isAdmin: false });

  // Add form values to fields
  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status,
        isAdmin: user.isAdmin
      });
    }
  }, [user]);

  const [updateUser, { isLoading: loadingUpdate, error }] = useUpdateUserMutation();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const submitHandler = async e => {
    e.preventDefault();

    const updatedUser = {
      _id: userId,
      ...formData
    };

    const result = await updateUser(updatedUser);

    if (result.error) {
      toast.error(result.error?.data?.message || result.error.error);
    } else {
      toast.success('User updated');
      refetch();
    }
  };

  return (
    <Container>
      <div className='mb-3 my-5'>
        <Link to='/'>Back to Homepage</Link>
      </div>

      <div className='heading-container text-center my-5'>
        <h3 className='heading'>My Profile</h3>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <ContainerCustom>
          <Form onSubmit={submitHandler}>
            <Row>
              <Col md={12} lg={6}>
                <div class='border-bottom border-dark mb-3'>
                  <h3 class='mb-0'>General Info</h3>
                </div>

                <Row>
                  <Col md={12}>
                    <Form.Group className='mb-3'>
                      <Form.Label>First Name:</Form.Label>
                      <Form.Control type='text' name='firstname' value={formData.firstname} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className='mb-3'>
                      <Form.Label>Last Name:</Form.Label>
                      <Form.Control type='text' name='lastname' value={formData.lastname} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className='mb-3'>
                      <Form.Label>Username:</Form.Label>
                      <Form.Control type='text' name='username' value={formData.username} onChange={handleChange} />
                    </Form.Group>
                  </Col>
                </Row>
              </Col>

              <Col md={12} lg={6}>
                <div className='border-bottom border-dark mb-3'>
                  <h3 className='mb-0'>Contact</h3>
                </div>

                <Form.Group className='mb-3'>
                  <Form.Label>Email:</Form.Label>
                  <Form.Control type='email' name='email' value={formData.email} onChange={handleChange} />
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Phone:</Form.Label>
                  <Form.Control type='text' name='phone' value={formData.phone} onChange={handleChange} />
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Role:</Form.Label>
                  <Form.Select value={formData.role} onChange={handleChange}>
                    <option value=''>Select Role</option>
                    <option value='sales'>Sales</option>
                    <option value='staff'>Staff</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Status:</Form.Label>
                  <Form.Select value={formData.status} onChange={handleChange}>
                    <option value=''>Select Status</option>
                    <option value='active'>Active</option>
                    <option value='inactive'>Inactive</option>
                    <option value='archived'>Archived</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group>
                  <Form.Check // prettier-ignore
                    type='checkbox'
                    id='isAdminCheck'
                    label='isAdmin'
                    name='isAdmin'
                    checked={formData.isAdmin}
                    onChange={e => setFormData(prev => ({ ...prev, isAdmin: e.target.checked }))}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className='d-flex justify-content-lg-end'>
              <button className='btn btn-primary me-lg-3' type='submit'>
                Save Changes
              </button>
            </div>
          </Form>
        </ContainerCustom>
      )}
    </Container>
  );
};

export default UserProfile;
