import React, { useEffect, useState } from 'react';
import { Button, Container, Table, Toast, Modal, Form, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useGetUsersQuery } from '../../../slices/usersApiSlice';
import { useCreateAccountTypeMutation, useGetAccountTypesQuery, useImportAccountTypeMutation, useDeleteAccountTypeMutation } from '../../../slices/admin/accountApiSlice';
import Loader from '../../../components/Loader';
import Message from '../../../components/Message';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';

const initialFormState = {
  name: '',
  code: ''
};

const AccountsDashboard = () => {
  // Get all Users
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();

  // Get all Account Types
  const { data: accountTypes, isLoading: loadingAccountTypes, error: accountTypesError, refetch: refetchAccountTypes } = useGetAccountTypesQuery();

  // Show New AccountType Modal
  const [showModal, setShowModal] = useState(false);

  const openNewAccountTypeModal = () => {
    //setFormData(initialFormState);
    setShowModal(true);
  };

  // End Open New Account Type Modal

  const [createAccountType, { isLoading: loadingCreate }] = useCreateAccountTypeMutation();
  const [importAccountType, { isLoading: loadingImport }] = useImportAccountTypeMutation();
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
      await createAccountType(payload).unwrap();
      toast.success('Account Type created');
      setShowModal(false);
      setFormData(initialFormState);
      refetchAccountTypes();
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  // Account type JSON file upload
  const handleFileChange = e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async evt => {
      try {
        const parsed = JSON.parse(evt.target.result);
        await importAccountType(parsed).unwrap();
        toast.success('Account Types imported');
        refetchAccountTypes();
      } catch (error) {
        toast.error(error?.data?.message || error?.error || 'Invalid JSON file');
      }
    };
    reader.readAsText(file);

    e.target.value = '';
  };

  // Delete Account type handler
  const [deleteAccountType] = useDeleteAccountTypeMutation();

  const deleteHandler = async id => {
    try {
      await deleteAccountType(id).unwrap();
      toast.success('Account Type removed');
      refetchAccountTypes();
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <Container>
      <div className='heading-container text-center my-5'>
        <h3 className='heading mb-3'>Admin - Accounts</h3>
      </div>

      <div className='link-container mb-3'>
        <Link to='/admin'>Back to Admin dashboard</Link>
      </div>

      <Tabs defaultActiveKey='users' id='fill-tab-accounts' fill>
        <Tab eventKey='users' title='Users' className='p-3'>
          <div className='action-container mb-3'>
            <Button variant='primary' to='/'>
              Create New User
            </Button>
          </div>

          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error?.data?.message || error.error}</Message>
          ) : (
            <Table hover bordered>
              <thead>
                <tr>
                  <th scope='col'>ID#</th>
                  <th scope='col'>Name</th>
                  <th scope='col'>Role</th>
                  <th scope='col'>Email</th>
                  <th scope='col'>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr>
                    <td>#{user._id}</td>
                    <td>
                      {user.firstname} {user.lastname}
                    </td>
                    <td>
                      <span className='text-capitalize'>{user.role}</span>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span className='text-capitalize'>{user.status}</span>
                    </td>
                    <td>
                      <Button variant='link'>
                        <FaTrash className='text-danger' />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Tab>

        <Tab eventKey='accountTypes' title='Account Types' className='p-3'>
          <div className='action-container mb-3 d-flex justify-content-lg-between align-items-lg-center'>
            <Button variant='primary' onClick={openNewAccountTypeModal}>
              Create New Account Type
            </Button>

            <div className='bulk-import'>
              <span className='d-block mb-1'>Account Type JSON Import</span>
              <input type='file' accept='json' onChange={handleFileChange} disabled={loadingImport} />
            </div>
          </div>

          {/* Create new account type modal */}

          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>New Account Type</Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-3'>
              <Form onSubmit={submitHandler}>
                <Form.Group className='mb-3'>
                  <Form.Label>Account Type Name</Form.Label>
                  <Form.Control type='text' name='name' value={formData.name} onChange={handleChange} required />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Account Type Code</Form.Label>
                  <Form.Control type='text' name='code' value={formData.code} onChange={handleChange} required />
                </Form.Group>

                <Modal.Footer className='justify-content-lg-between d-flex'>
                  <Button variant='secondary' onClick={() => setShowModal(false)}>
                    Cancel
                  </Button>
                  <Button variant='primary' type='submit'>
                    Create Account Type
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </Modal>

          {/* End create account type modal */}

          {loadingAccountTypes ? (
            <Loader />
          ) : accountTypesError ? (
            <Message variant='danger'>{accountTypesError?.data?.message || accountTypesError.error}</Message>
          ) : (
            <Table hover bordered>
              <thead>
                <tr>
                  <th scope='col'>ID#</th>
                  <th scope='col'>Account Type Name</th>
                  <th scope='col'>Code</th>
                  <th scope='col'>Created On</th>
                  <th scope='col'>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {accountTypes.map(type => (
                  <tr key={type._id}>
                    <td>#{type._id}</td>
                    <td>{type.name}</td>
                    <td>{type.code}</td>
                    <td>{new Date(type.createdAt).toLocaleDateString()}</td>
                    <td>
                      <span className='text-capitalize'>{type.status}</span>
                    </td>
                    <td>
                      <Button variant='text-link' onClick={() => deleteHandler(type._id)}>
                        <FaTrash className='text-danger' />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Tab>
        <Tab eventKey='userRoles' title='User Roles' className='p-3'></Tab>
      </Tabs>
    </Container>
  );
};

export default AccountsDashboard;
